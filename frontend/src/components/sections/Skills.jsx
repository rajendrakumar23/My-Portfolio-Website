import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { skillsAPI } from '../../services/api';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const fallbackSkills = {
  frontend: [
    { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 90 },
    { name: 'JavaScript', level: 88 }, { name: 'React.js', level: 85 }, { name: 'Tailwind CSS', level: 85 },
  ],
  backend: [{ name: 'Node.js', level: 82 }, { name: 'Express.js', level: 80 }],
  database: [{ name: 'MongoDB', level: 80 }],
  tools: [{ name: 'GitHub', level: 85 }, { name: 'VS Code', level: 90 }, { name: 'Postman', level: 80 }],
};

const categoryColors = {
  frontend: 'from-indigo-500 to-purple-500',
  backend: 'from-green-500 to-teal-500',
  database: 'from-orange-500 to-red-500',
  tools: 'from-cyan-500 to-blue-500',
};

const categoryLabels = {
  frontend: '🎨 Frontend',
  backend: '⚙️ Backend',
  database: '🗄️ Database',
  tools: '🛠️ Tools',
};

function SkillBar({ name, level, color, isDark, isLast }) {
  return (
    <motion.div variants={fadeInUp} className={isLast ? '' : 'mb-5'}>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
        <span className="text-xs font-semibold gradient-text tabular-nums">{level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700/80' : 'bg-gray-200'}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const [grouped, setGrouped] = useState(fallbackSkills);

  useEffect(() => {
    skillsAPI.getAll()
      .then(({ data }) => { if (data.grouped && Object.keys(data.grouped).length) setGrouped(data.grouped); })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper id="skills" className={isDark ? 'bg-gray-950' : 'bg-gray-50'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Skills & Technologies" subtitle="Technologies I work with" isDark={isDark} />

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(grouped).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              className={`p-5 sm:p-6 rounded-2xl glass ${isDark ? '' : 'glass-light'}`}
            >
              <h3 className={`text-base sm:text-lg font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {categoryLabels[category] || category}
              </h3>
              {skills.map((skill, idx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={categoryColors[category] || 'from-indigo-500 to-purple-500'}
                  isDark={isDark}
                  isLast={idx === skills.length - 1}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech Icons Row */}
        <motion.div variants={fadeInUp} className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Tailwind', 'Git', 'Postman'].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.08, y: -2 }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium glass transition-all cursor-default ${
                isDark ? 'text-gray-300 hover:text-indigo-300' : 'glass-light text-gray-700 hover:text-indigo-600'
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
