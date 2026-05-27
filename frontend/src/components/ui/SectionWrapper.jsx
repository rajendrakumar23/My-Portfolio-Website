import { motion } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const SectionWrapper = ({ children, id, className = '' }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={staggerContainer}
    className={`section-padding ${className}`}
  >
    {children}
  </motion.section>
);

export const SectionTitle = ({ title, subtitle, isDark }) => (
  <motion.div variants={fadeInUp} className="text-center mb-12 lg:mb-16">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
      <span className="gradient-text">{title}</span>
    </h2>
    {subtitle && (
      <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {subtitle}
      </p>
    )}
    <div className="mt-4 flex justify-center">
      <div className="h-1 w-16 sm:w-20 rounded-full gradient-bg" />
    </div>
  </motion.div>
);
