import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitCommit, FiCode } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const GITHUB_USERNAME = 'rajendrakumar23';

const stats = [
  { icon: FiGithub, label: 'GitHub Profile', value: GITHUB_USERNAME, link: `https://github.com/${GITHUB_USERNAME}` },
  { icon: FiStar,      label: 'Total Stars',    value: '10+'  },
  { icon: FiGitCommit, label: 'Contributions',  value: '200+' },
  { icon: FiCode,      label: 'Repositories',   value: '15+'  },
];

export default function GitHubStats() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="github" className={isDark ? 'bg-gray-950' : 'bg-gray-50'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionTitle
          title="GitHub Stats"
          subtitle="My open source activity"
          isDark={isDark}
        />

        {/* ── 4 stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, link }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-4 sm:p-5 rounded-2xl glass text-center transition-all duration-300 ${
                isDark ? 'hover:border-indigo-500/30' : 'glass-light hover:border-indigo-200'
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-white" />
              </div>

              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-text font-bold text-sm sm:text-base hover:underline break-all"
                >
                  @{value}
                </a>
              ) : (
                <div className="gradient-text font-bold text-xl sm:text-2xl">{value}</div>
              )}

              <div className={`text-xs sm:text-sm mt-1 leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Contribution graph ── */}
        <motion.div
          variants={fadeInUp}
          className={`rounded-2xl glass p-5 sm:p-6 ${isDark ? '' : 'glass-light'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm sm:text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Contribution Activity
            </h3>
          </div>

          {/* Graph — scales naturally, no forced min-width */}
          <div className={`rounded-xl overflow-hidden p-3 mb-5 ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/60'}`}>
            <img
              src={`https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`}
              alt="GitHub Contribution Chart"
              className="w-full h-auto block"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <div className="flex justify-center">
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg shadow-indigo-500/25"
            >
              <FiGithub size={15} /> View GitHub Profile
            </motion.a>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
