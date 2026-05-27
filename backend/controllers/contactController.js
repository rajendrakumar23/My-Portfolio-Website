const nodemailer = require('nodemailer');
const Message = require('../models/Message');

// ── Build transporter lazily so it always reads the current env values ──────
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      'EMAIL_USER or EMAIL_PASS is missing from .env. ' +
      'Add your Gmail address and 16-character App Password.'
    );
  }
  return nodemailer.createTransport({
    service: 'gmail',          // lets Nodemailer resolve host/port automatically
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // strip any accidental spaces
    },
  });
}

// ── Verify SMTP connection once at startup (non-fatal) ───────────────────────
setTimeout(() => {
  // Guard: catch the most common .env mistakes before hitting Gmail
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  if (!user || user.includes('your_') || !user.includes('@')) {
    console.error('❌ EMAIL_USER is not set to a real Gmail address in .env');
    return;
  }
  if (!pass) {
    console.error('❌ EMAIL_PASS is missing in .env');
    return;
  }
  if (pass.includes(' ')) {
    console.error('❌ EMAIL_PASS contains spaces — remove all spaces from the App Password in .env');
    console.error('   Wrong:   mfdw xmeb spxl cbqp');
    console.error('   Correct: mfdwxmebspxlcbqp');
    return;
  }
  if (pass.length !== 16) {
    console.warn(`⚠️  EMAIL_PASS is ${pass.length} chars — Gmail App Passwords are exactly 16 chars`);
  }

  try {
    const t = createTransporter();
    t.verify((err) => {
      if (err) {
        console.error('❌ SMTP verify failed:', err.message);
        if (err.message.includes('535') || err.message.includes('Username and Password')) {
          console.error('   → Root cause: Wrong App Password or 2-Step Verification not enabled.');
          console.error('   → Fix: Go to https://myaccount.google.com/apppasswords');
          console.error('   → Create a new App Password, copy it WITHOUT spaces into EMAIL_PASS');
        }
      } else {
        console.log('✅ SMTP transporter ready — emails will work.');
      }
    });
  } catch (e) {
    console.error('❌ Transporter creation failed at startup:', e.message);
  }
}, 2000);

// ── Helper: send one email, returns { ok, error } — never throws ─────────────
async function safeSendMail(options) {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(options);
    console.log('📧 Email sent:', info.messageId, '→', options.to);
    return { ok: true };
  } catch (err) {
    console.error('❌ Email send failed to', options.to, ':', err.message);
    return { ok: false, error: err.message };
  }
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
exports.sendMessage = async (req, res, next) => {
  try {
    console.log('📩 Contact form received:', req.body);

    const { name, email, subject, message } = req.body;

    // Validate
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 1. Save to MongoDB first (independent of email)
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: req.ip,
    });
    console.log('💾 Message saved to DB:', newMessage._id);

    // 2. Send notification email to portfolio owner
    const ownerResult = await safeSendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `📬 New Contact: ${subject.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#6366f1;margin-bottom:16px;">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:80px;">Name:</td><td style="padding:8px 0;color:#6b7280;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email:</td><td style="padding:8px 0;color:#6b7280;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Subject:</td><td style="padding:8px 0;color:#6b7280;">${subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:6px;">
            <p style="font-weight:bold;color:#374151;margin:0 0 8px;">Message:</p>
            <p style="color:#6b7280;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    // 3. Send auto-reply to the sender
    const replyResult = await safeSendMail({
      from: `"Rajendra Kumar Kushwaha" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: '✅ Thanks for reaching out!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e5e7eb;border-radius:8px;">
          <h2 style="color:#6366f1;">Hi ${name},</h2>
          <p style="color:#6b7280;line-height:1.6;">Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
          <p style="color:#6b7280;line-height:1.6;">Here's a copy of what you sent:</p>
          <div style="padding:16px;background:#f9fafb;border-radius:6px;margin:16px 0;">
            <p style="font-weight:bold;color:#374151;margin:0 0 4px;">Subject: ${subject}</p>
            <p style="color:#6b7280;margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#374151;margin-top:24px;">Best regards,<br/><strong>Rajendra Kumar Kushwaha</strong><br/>
          <span style="color:#6366f1;">MERN Stack Developer</span></p>
        </div>
      `,
    });

    // 4. Respond — message is saved regardless of email status
    const emailWorked = ownerResult.ok && replyResult.ok;

    return res.status(201).json({
      success: true,
      message: emailWorked
        ? 'Message sent successfully!'
        : 'Message saved! (Email delivery had an issue — check server EMAIL config)',
      emailSent: emailWorked,
      data: { id: newMessage._id, name: newMessage.name },
    });

  } catch (err) {
    console.error('❌ sendMessage controller error:', err);
    next(err);
  }
};

// ── GET /api/contact  (admin only) ───────────────────────────────────────────
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) { next(err); }
};

// ── PUT /api/contact/:id/read  (admin only) ──────────────────────────────────
exports.markRead = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) { next(err); }
};

// ── DELETE /api/contact/:id  (admin only) ────────────────────────────────────
exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) { next(err); }
};
