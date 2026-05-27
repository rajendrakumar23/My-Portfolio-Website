import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import developerImg from '../../assets/developer .png';

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('home');
  const { isDark, toggleTheme } = useTheme();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close drawer when viewport widens to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href) => {
    setActive(href.replace('#', ''));
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10'
              : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">

            {/* Left — developer image logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={developerImg}
                alt="Rajendra Kumar"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-indigo-500/40"
              />
            </motion.a>

            {/* Desktop links — evenly spaced, truly centered */}
            <div className="hidden lg:flex flex-1 items-center justify-evenly">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  whileHover={{ y: -1 }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    active === link.href.replace('#', '')
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : isDark
                        ? 'text-gray-300 hover:text-indigo-400 hover:bg-white/5'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto lg:ml-0">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold whitespace-nowrap"
              >
                Hire Me
              </motion.a>

              <button
                onClick={() => setIsOpen((p) => !p)}
                aria-label="Toggle menu"
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`lg:hidden overflow-hidden border-t ${
                isDark ? 'bg-gray-900/98 border-white/10' : 'bg-white/98 border-gray-200'
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active === link.href.replace('#', '')
                        ? isDark
                          ? 'text-indigo-400 bg-indigo-500/10'
                          : 'text-indigo-600 bg-indigo-50'
                        : isDark
                          ? 'text-gray-300 hover:text-indigo-400 hover:bg-white/5'
                          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-xl gradient-bg text-white text-sm font-semibold"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
