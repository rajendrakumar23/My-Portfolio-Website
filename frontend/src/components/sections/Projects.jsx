import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiCode } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { projectsAPI } from '../../services/api';
import { SectionWrapper, SectionTitle, fadeInUp } from '../ui/SectionWrapper';

const categoryColors = {
  fullstack: 'from-indigo-500 to-purple-500',
  frontend: 'from-cyan-500 to-blue-500',
  backend: 'from-green-500 to-teal-500',
  ml: 'from-orange-500 to-red-500',
  other: 'from-gray-500 to-gray-600',
};

function ProjectCard({ project, isDark, onClick }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      onClick={() => onClick(project)}
      className={`rounded-2xl overflow-hidden glass cursor-pointer group transition-all duration-300 ${
        isDark ? 'hover:border-indigo-500/40' : 'glass-light hover:border-indigo-200'
      }`}
    >
      {/* Image / Gradient Header */}
      <div className={`h-44 bg-gradient-to-br ${categoryColors[project.category] || categoryColors.other} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <FiCode size={48} className="text-white/30" />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
            ⭐ Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 text-white text-xs rounded-full capitalize">
          {project.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack?.slice(0, 4).map((tech) => (
            <span key={tech} className={`px-2 py-0.5 rounded-md text-xs font-medium ${
              isDark ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
            }`}>{tech}</span>
          ))}
          {project.techStack?.length > 4 && (
            <span className={`px-2 py-0.5 rounded-md text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isDark ? 'border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400' : 'border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              <FiGithub size={13} /> Code
            </motion.a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium gradient-bg text-white"
            >
              <FiExternalLink size={13} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, isDark, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-900 border border-white/10' : 'bg-white'}`}
        >
          <div className={`h-48 bg-gradient-to-br ${categoryColors[project.category]} relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiCode size={64} className="text-white/20" />
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/60">
              <FiX size={18} />
            </button>
          </div>
          <div className="p-6">
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h2>
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {project.longDescription || project.description}
            </p>
            {project.features?.length > 0 && (
              <div className="mb-4">
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {project.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-indigo-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack?.map((tech) => (
                <span key={tech} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{tech}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm ${isDark ? 'border-gray-600 text-gray-300 hover:border-indigo-500' : 'border-gray-300 text-gray-700 hover:border-indigo-400'}`}>
                  <FiGithub size={16} /> View Code
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white font-medium text-sm">
                  <FiExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const { isDark } = useTheme();
  // const [projects, setProjects] = useState([]);
  const [projects, setProjects] = useState([
  {
    _id: 1,
    title: "Job Portal",
    description:
      "A MERN stack job portal where recruiters can post jobs and candidates can apply.",
    longDescription:
      "Full stack job portal with authentication, admin dashboard and job application system.",
    category: "fullstack",
    featured: true,
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourgithub/jobportal",
    liveUrl: "https://job-portal-web-application0.netlify.app/",
    features: [
      "Authentication",
      "Admin Dashboard",
      "Job Apply System",
      "Responsive Design",
    ],
  },

  {
    _id: 2,
    title: "E-Commerce Website",
    description:
      "Full stack ecommerce application with cart and payment integration.",
    longDescription:
      "Modern ecommerce platform with authentication, cart and product management.",
    category: "fullstack",
    featured: true,
    techStack: ["React", "Redux", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourgithub/ecommerce",
    liveUrl: "#",
    features: [
      "Authentication",
      "Cart System",
      "Product Management",
      "Responsive UI",
    ],
  },

  {
    _id: 3,
    title: "Portfolio Website",
    description:
      "Modern animated portfolio website using React and Tailwind CSS.",
    longDescription:
      "Responsive portfolio with dark mode, animations and project showcase.",
    category: "frontend",
    featured: true,
    techStack: ["React", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/yourgithub/portfolio",
    liveUrl: "https://myportfoliowebsite95.netlify.app/",
    features: [
      "Dark Mode",
      "Animations",
      "Responsive Design",
      "Modern UI",
    ],
  },
]);

  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  // useEffect(() => {
  //   projectsAPI.getAll()
  //     .then(({ data }) => setProjects(data.data || []))
  //     .catch(() => setProjects([]))
  //     .finally(() => setLoading(false));
  // }, []);

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper id="projects" className={isDark ? 'bg-gray-900' : 'bg-white'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="My Projects" subtitle="Things I've built" isDark={isDark} />

        {/* Filter Tabs */}
        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === cat
                  ? 'gradient-bg text-white shadow-lg shadow-indigo-500/25'
                  : isDark ? 'glass text-gray-400 hover:text-white' : 'glass-light text-gray-600 hover:text-indigo-600'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-72 rounded-2xl animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            ))}
          </div>
        ) : (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} isDark={isDark} onClick={setSelected} />
            ))}
          </motion.div>
        )}
      </div>

      <ProjectModal project={selected} isDark={isDark} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}
