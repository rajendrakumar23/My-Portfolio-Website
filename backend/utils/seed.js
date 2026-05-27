require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding...');
};

const seedData = async () => {
  await connectDB();

  await User.deleteMany();
  await Project.deleteMany();
  await Skill.deleteMany();

  await User.create({
    name: 'Rajendra Kumar Kushwaha',
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
  });

  await Project.insertMany([
    {
      title: 'Portfolio Website',
      description: 'A modern full-stack developer portfolio built with MERN stack featuring glassmorphism UI, animations, and admin dashboard.',
      longDescription: 'Built with React.js, Node.js, Express.js, and MongoDB. Features include dark/light mode, smooth animations with Framer Motion, admin panel for content management, and contact form with email notifications.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
      features: ['Admin Dashboard', 'Dark/Light Mode', 'Contact Form', 'Responsive Design', 'JWT Auth'],
      githubUrl: 'https://github.com/rajendrakumar23',
      liveUrl: '#',
      category: 'fullstack',
      featured: true,
      order: 1,
    },
    {
      title: 'Intern Portal System',
      description: 'A comprehensive internship management portal for companies to manage intern applications, tasks, and progress tracking.',
      longDescription: 'Full-stack application with role-based access control for admins, mentors, and interns. Features task assignment, progress tracking, and report generation.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      features: ['Role-based Access', 'Task Management', 'Progress Tracking', 'Email Notifications', 'Dashboard Analytics'],
      githubUrl: 'https://github.com/rajendrakumar23',
      liveUrl: '#',
      category: 'fullstack',
      featured: true,
      order: 2,
    },
    {
      title: 'Bad Posture Detection App',
      description: 'An AI-powered web application that detects bad posture in real-time using computer vision and provides corrective feedback.',
      longDescription: 'Uses TensorFlow.js and PoseNet model to analyze body posture through webcam feed. Provides real-time alerts and posture correction suggestions.',
      techStack: ['React.js', 'TensorFlow.js', 'PoseNet', 'Node.js', 'MongoDB'],
      features: ['Real-time Detection', 'Posture Analysis', 'Alert System', 'History Tracking', 'Webcam Integration'],
      githubUrl: 'https://github.com/rajendrakumar23',
      liveUrl: '#',
      category: 'ml',
      featured: true,
      order: 3,
    },
    {
      title: 'Court Case Dashboard',
      description: 'A legal case management dashboard for tracking court cases, hearings, documents, and case status updates.',
      longDescription: 'Built for legal professionals to manage case files, schedule hearings, track deadlines, and generate reports. Features advanced filtering and search capabilities.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
      features: ['Case Tracking', 'Document Management', 'Hearing Scheduler', 'Analytics Dashboard', 'Search & Filter'],
      githubUrl: 'https://github.com/rajendrakumar23',
      liveUrl: '#',
      category: 'fullstack',
      featured: false,
      order: 4,
    },
    {
      title: 'Authentication System',
      description: 'A secure, production-ready authentication system with JWT, refresh tokens, email verification, and OAuth integration.',
      longDescription: 'Complete auth solution with registration, login, email verification, password reset, JWT access/refresh tokens, and Google OAuth. Includes rate limiting and security best practices.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcryptjs', 'Nodemailer'],
      features: ['JWT Auth', 'Email Verification', 'Password Reset', 'OAuth Integration', 'Rate Limiting'],
      githubUrl: 'https://github.com/rajendrakumar23',
      liveUrl: '#',
      category: 'backend',
      featured: false,
      order: 5,
    },
  ]);

  await Skill.insertMany([
    { name: 'HTML5', category: 'frontend', level: 95, icon: 'html5', order: 1 },
    { name: 'CSS3', category: 'frontend', level: 90, icon: 'css3', order: 2 },
    { name: 'JavaScript', category: 'frontend', level: 88, icon: 'javascript', order: 3 },
    { name: 'React.js', category: 'frontend', level: 85, icon: 'react', order: 4 },
    { name: 'Tailwind CSS', category: 'frontend', level: 85, icon: 'tailwind', order: 5 },
    { name: 'Node.js', category: 'backend', level: 82, icon: 'nodejs', order: 6 },
    { name: 'Express.js', category: 'backend', level: 80, icon: 'express', order: 7 },
    { name: 'MongoDB', category: 'database', level: 80, icon: 'mongodb', order: 8 },
    { name: 'GitHub', category: 'tools', level: 85, icon: 'github', order: 9 },
    { name: 'VS Code', category: 'tools', level: 90, icon: 'vscode', order: 10 },
    { name: 'Postman', category: 'tools', level: 80, icon: 'postman', order: 11 },
  ]);

  console.log('✅ Database seeded successfully!');
  process.exit(0);
};

seedData().catch(err => { console.error(err); process.exit(1); });
