import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const experiences = [
  {
    role: 'Full Stack Developer (Future Finders Company)',
    company: 'Future Finders Company',
    location: 'Mohali, Punjab',
    period: '2026 – Present',
    type: 'Office',
    description: 'Building full-stack web applications for clients using MERN stack. Developed portfolio websites, management systems, and REST APIs.',
    achievements: [
      'Delivered 5+ production-ready web applications',
      'Implemented JWT authentication and role-based access control',
      'Integrated MongoDB Atlas for cloud database management',
      'Built responsive UIs with React.js and Tailwind CSS',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'JWT', 'Git', 'MongoDB Atlas', 'REST API', 'MERN Stack'],
  },
  {
    role: 'Frontend Developer  (Learning)',
    company: 'Excellence Technologies',
    location: 'Mohali, Punjab',
    period: 'june 2024 - july 2024',
    type: 'Office',
    description: "Developed responsive and user-friendly web interfaces using HTML, CSS, JavaScript, React.js, and Tailwind CSS.Implemented reusable UI components and integrated REST APIs",
    achievements: [
      'Completed a 1-month Frontend Developer training program with hands-on project experience',
      'Built and deployed responsive web applications using React.js and Tailwind CSS.',
      'Implemented API integrations and modern UI/UX practices in live projects.',
      'Demonstrated strong problem-solving and teamwork skills in a professional development environment.',
    ],
    tech: ['JavaScript', 'React.js', 'Tailwind CSS', 'REST API', 'Git', "GitHub", "HTML", "CSS"],
  },
];

export default function Experience() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="experience" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Experience" subtitle="My professional journey" isDark={isDark} />

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              variants={fadeInUp}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -3 }}
              className={`p-5 sm:p-7 rounded-2xl glass transition-all duration-300 ${isDark ? '' : 'glass-light'}`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiBriefcase size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold leading-snug mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {exp.role}
                    </h3>
                    <p className="gradient-text font-semibold text-sm">{exp.company}</p>
                  </div>
                </div>

                {/* Meta — type badge + date + location */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 flex-shrink-0 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    exp.type === 'Freelance'
                      ? 'bg-purple-500/15 text-purple-400'
                      : 'bg-blue-500/15 text-blue-400'
                  }`}>
                    {exp.type}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <FiCalendar size={11} className="flex-shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <FiMapPin size={11} className="flex-shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-5 max-w-prose ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {exp.description}
              </p>

              {/* Achievements */}
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((a) => (
                  <li
                    key={a}
                    className={`text-sm flex items-start gap-2.5 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0 text-base leading-none">▸</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      isDark ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
