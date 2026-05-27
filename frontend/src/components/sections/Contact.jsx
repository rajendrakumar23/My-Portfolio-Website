import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { contactAPI } from '../../services/api';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'rk1071567@gmail.com', href: 'mailto:rk1071567@gmail.com' },
  { icon: FiMapPin, label: 'Location', value: 'Sahibzada Ajit Singh Nagar, India', href: null },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'rajendra-kumar-kushwaha', href: 'https://www.linkedin.com/in/rajendra-kumar-kushwaha-61b045291/' },
  { icon: FiGithub, label: 'GitHub', value: 'rajendrakumar23', href: 'https://github.com/rajendrakumar23' },
];

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await contactAPI.send(form);
      toast.success("Message sent successfully! I'll get back to you soon. 🎉");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message
        || err.message
        || 'Failed to send message. Please try again.';
      console.error('[Contact] submit error:', {
        status: err.response?.status,
        data:   err.response?.data,
        msg:    err.message,
      });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/40 ${
    isDark
      ? 'bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-400'
  }`;

  const labelClass = `block text-xs font-semibold mb-2 tracking-wide uppercase ${
    isDark ? 'text-gray-400' : 'text-gray-500'
  }`;

  return (
    <SectionWrapper id="contact" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" isDark={isDark} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left — Contact Info ── */}
          <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
            <div>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Let's build something amazing together!
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed max-w-prose ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm currently open to new opportunities — whether it's a full-time role, freelance
                project, or just a friendly chat about tech. My inbox is always open!
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl glass transition-all${
                    isDark ? '' : 'glass-light'
                  }`}
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium hover:text-indigo-400 transition-colors truncate block ${
                          isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={`text-sm font-medium truncate block ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.div variants={fadeInUp}>
            <form
              onSubmit={handleSubmit}
              className={`p-6 sm:p-8 rounded-2xl glass space-y-5 ${isDark ? '' : 'glass-light'}`}
            >
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-8 sm:gap-5">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className={labelClass}>Subject *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
