import { motion } from 'framer-motion';
import { FiBook, FiAward, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'Punjab Technical University',
    rollNo: '2207792',
    period: '2022 – 2026',
    status: 'Completed',
    icon: '🎓',
    highlights: ['MERN Stack Development', 'Data Structures & Algorithms', 'Database Management', 'Software Engineering'],
  },
  {
    degree: 'Higher Secondary (12th)',
    field: 'Science (PCM)',
    institution: 'Senior Secondary School',
    period: '2020 – 2022',
    status: 'Completed',
    icon: '📚',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
  },
];

export default function Education() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="education" className={isDark ? 'bg-gray-950' : 'bg-gray-50'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Education" subtitle="My academic background" isDark={isDark} />

        <div className="relative">
          {/* Timeline Line — left on mobile, center on md+ */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                variants={fadeInUp}
                transition={{ delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full gradient-bg flex items-center justify-center text-base sm:text-lg z-10 shadow-lg shadow-indigo-500/30 -translate-x-1/2">
                  {edu.icon}
                </div>

                {/* Card */}
                <div className={`ml-12 sm:ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`p-4 sm:p-6 rounded-2xl glass ${isDark ? '' : 'glass-light'}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h3>
                        <p className="gradient-text font-semibold text-sm">{edu.field}</p>
                      </div>
                      <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                        edu.status === 'Pursuing'
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-blue-500/15 text-blue-400'
                      }`}>
                        {edu.status}
                      </span>
                    </div>

                    <div className={`flex items-center gap-2 mb-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <FiBook size={14} />
                      <span>{edu.institution}</span>
                    </div>
                    {edu.rollNo && (
                      <div className={`flex items-center gap-2 mb-1 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <FiAward size={14} />
                        <span>Roll No: {edu.rollNo}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-2 mb-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      <FiCalendar size={14} />
                      <span>{edu.period}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((h) => (
                        <span key={h} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          isDark ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                        }`}>{h}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
