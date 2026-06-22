import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiDownload, FiMail, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import profileImg from "../../assets/image.png";


export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left Content ── */}
          <div className="text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 sm:mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className={`text-xs sm:text-sm font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.15] tracking-tight mb-4 sm:mb-5 ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Hi, I'm{' '}
              <span className="gradient-text block sm:inline">Rajendra Kumar</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-5 sm:mb-6 min-h-[2rem] sm:min-h-[2.5rem]"
            >
              <span className={`text-base sm:text-lg md:text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm a{' '}
              </span>
              <TypeAnimation
                sequence={[
                  'MERN Stack Developer', 2000,
                  'Full Stack Developer', 2000,
                  'React Developer', 2000,
                  'JavaScript Developer', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text text-base sm:text-lg md:text-xl font-semibold"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-lg mx-auto lg:mx-0 ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
            >
              Passionate about building scalable web applications with modern technologies.
              Specializing in MERN stack development with a focus on clean code and great UX.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`flex items-center justify-center lg:justify-start gap-1.5 mb-7 sm:mb-8 text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'
                }`}
            >
              <FiMapPin size={13} className="flex-shrink-0" />
              <span>Sahibzada Ajit Singh Nagar, India</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-5 mb-9 sm:mb-10"
            >
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-indigo-500/25 text-sm sm:text-base"
              >
                <FiMail size={16} /> Contact Me
              </motion.a>
              <motion.a
                href="/Rajendrakumarkushwaha resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold border-2 border-indigo-500 transition-colors text-sm sm:text-base ${isDark ? 'text-indigo-400 hover:bg-indigo-500/10' : 'text-indigo-600 hover:bg-indigo-50'
                  }`}
              >
                <FiDownload size={16} /> Resume
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 pt-5 mb-0"
            >
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
                  whileHover={{ scale: 1.15, y: -3 }}
                  className={`p-2.5 sm:p-3 rounded-xl glass transition-colors ${isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600 glass-light'
                    }`}
                  aria-label={label}
                >
                  <Icon size={19} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Profile Circle ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end mt-6 lg:mt-0"
          >
            <div className="relative">

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full gradient-bg blur-2xl opacity-25 scale-110" />

              {/* Profile Circle */}
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full gradient-bg p-[3px] float-animation glow">

                <div
                  className={`w-full h-full rounded-full overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"
                    }`}
                >
                  <img
                    src={profileImg}
                    alt="Rajendra Kumar"
                    // className="w-full h-full object-cover rounded-full"
                    className="w-full h-full object-cover scale-125 object-top rounded-full"
                  />
                </div>

              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className={`absolute -top-2 right-0 sm:-top-4 sm:-right-3 px-2.5 py-1.5 rounded-xl glass text-xs font-semibold whitespace-nowrap shadow-lg ${isDark
                  ? 'text-indigo-300'
                  : 'text-indigo-600 glass-light'
                  }`}
              >
                ⚛️ React.js
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className={`absolute -bottom-2 left-0 sm:-bottom-4 sm:-left-3 px-2.5 py-1.5 rounded-xl glass text-xs font-semibold whitespace-nowrap shadow-lg ${isDark
                  ? 'text-green-300'
                  : 'text-green-600 glass-light'
                  }`}
              >
                🍃 MongoDB
              </motion.div>

              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className={`absolute top-1/2 -translate-y-1/2 -left-12 sm:-left-16 px-2.5 py-1.5 rounded-xl glass text-xs font-semibold whitespace-nowrap shadow-lg ${isDark
                  ? 'text-yellow-300'
                  : 'text-yellow-600 glass-light'
                  }`}
              >
                🟨 Node.js
              </motion.div>


            </div>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 sm:mt-20 lg:mt-24 pt-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {[
            { value: '5+', label: 'Projects Built' },
            { value: '10+', label: 'Technologies' },
            { value: '2+', label: 'Years Learning' },
            { value: '100%', label: 'Dedication' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className={`text-center py-4 px-3 sm:py-5 sm:px-4 rounded-2xl glass ${isDark ? '' : 'glass-light'
                }`}
            >
              <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">
                {value}
              </div>

              <div
                className={`text-xs sm:text-sm leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
