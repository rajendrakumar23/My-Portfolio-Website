import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t ${isDark ? 'bg-gray-950 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold gradient-text cursor-pointer flex-shrink-0"
          >
            &lt;RK /&gt;
          </motion.a>

          {/* Copyright */}
          <p className={`text-xs sm:text-sm flex items-center gap-1.5 text-center order-last sm:order-none ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Made with{' '}
            <FiHeart className="text-red-500 fill-red-500 flex-shrink-0" size={13} />
            {' '}by{' '}
            <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Rajendra Kumar Kushwaha
            </span>
            {' '}© {year}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { icon: FiGithub, href: 'https://github.com/rajendrakumar23', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/rajendra-kumar-kushwaha-61b045291/', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:rajendrakumar@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className={`p-2.5 rounded-xl transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-indigo-400 hover:bg-white/5'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
