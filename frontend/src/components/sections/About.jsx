import { motion } from 'framer-motion';
import { FiCode, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const highlights = [
  { icon: FiCode, title: 'MERN Stack', desc: 'Building full-stack apps with MongoDB, Express, React & Node.js' },
  { icon: FiTarget, title: 'Problem Solver', desc: 'Analytical mindset with focus on clean, efficient solutions' },
  { icon: FiTrendingUp, title: 'Fast Learner', desc: 'Continuously upskilling with latest web technologies' },
  { icon: FiUsers, title: 'Team Player', desc: 'Collaborative approach with strong communication skills' },
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="about" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get to know me better" isDark={isDark} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left — Text ── */}
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className={`text-base sm:text-lg leading-relaxed max-w-prose ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm{' '}
              <span className="gradient-text font-semibold">Rajendra Kumar Kushwaha</span>, a passionate
              Full Stack Web Developer from Punjab Technical University (Roll No: 2207792), currently
              based in Sahibzada Ajit Singh Nagar, India.
            </p>
            <p className={`text-sm sm:text-base leading-relaxed max-w-prose ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              My journey in web development started with a curiosity about how websites work, which quickly
              evolved into a deep passion for building scalable, user-friendly applications. I specialize in
              the{' '}
              <span className="text-indigo-400 font-medium">MERN Stack</span> — MongoDB, Express.js,
              React.js, and Node.js — and love crafting end-to-end solutions.
            </p>
            <p className={`text-sm sm:text-base leading-relaxed max-w-prose ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm actively preparing for placements, working on real-world projects, and sharpening my
              skills in data structures, algorithms, and system design. I believe in writing clean,
              maintainable code and building products that make a difference.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${
                    isDark
                      ? 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10'
                      : 'border-indigo-200 text-indigo-600 bg-indigo-50'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href="https://www.linkedin.com/in/rajendra-kumar-kushwaha-61b045291/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold"
              >
                LinkedIn Profile
              </motion.a>
              <motion.a
                href="https://github.com/rajendrakumar23"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-indigo-500 transition-colors ${
                  isDark ? 'text-indigo-400 hover:bg-indigo-500/10' : 'text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                GitHub Profile
              </motion.a>
            </div>
          </motion.div>

          {/* ── Right — Highlight Cards ── */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`flex flex-col p-4 sm:p-5 rounded-2xl glass transition-all duration-300 ${
                  isDark ? 'hover:border-indigo-500/30' : 'glass-light hover:border-indigo-200'
                }`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-bg flex items-center justify-center mb-3 flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className={`font-semibold text-sm sm:text-base mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
