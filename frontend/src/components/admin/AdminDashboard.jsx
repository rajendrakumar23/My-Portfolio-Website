import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMail, FiCode, FiMessageSquare, FiLogOut, FiBarChart2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { projectsAPI, skillsAPI, contactAPI, adminAPI } from '../../services/api';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FiBarChart2 },
  { id: 'projects', label: 'Projects', icon: FiCode },
  { id: 'messages', label: 'Messages', icon: FiMessageSquare },
];

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) { navigate('/admin'); return; }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, projectsRes, messagesRes] = await Promise.all([
        adminAPI.getStats(),
        projectsAPI.getAll(),
        contactAPI.getAll(),
      ]);
      setStats(statsRes.data.data);
      setProjects(projectsRes.data.data);
      setMessages(messagesRes.data.data);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      setProjects(p => p.filter(x => x._id !== id));
      toast.success('Project deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await contactAPI.delete(id);
      setMessages(m => m.filter(x => x._id !== id));
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleMarkRead = async (id) => {
    try {
      await contactAPI.markRead(id);
      setMessages(m => m.map(x => x._id === id ? { ...x, isRead: true } : x));
    } catch { toast.error('Failed to update'); }
  };

  const handleLogout = () => { logout(); navigate('/admin'); };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold gradient-text">&lt;RK /&gt;</span>
          <span className="text-gray-400 text-sm">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Welcome, {user?.name?.split(' ')[0]}</span>
          <motion.button onClick={handleLogout} whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">
            <FiLogOut size={14} /> Logout
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === id ? 'gradient-bg text-white' : 'glass text-gray-400 hover:text-white'
              }`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Projects', value: stats.totalProjects || 0, color: 'from-indigo-500 to-purple-500' },
                  { label: 'Total Messages', value: stats.totalMessages || 0, color: 'from-green-500 to-teal-500' },
                  { label: 'Unread Messages', value: stats.unreadMessages || 0, color: 'from-orange-500 to-red-500' },
                  { label: 'Total Skills', value: stats.totalSkills || 0, color: 'from-cyan-500 to-blue-500' },
                ].map(({ label, value, color }) => (
                  <motion.div key={label} whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl glass text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</div>
                    <div className="text-gray-400 text-sm mt-1">{label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Projects ({projects.length})</h2>
                </div>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p._id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{p.title}</div>
                        <div className="text-gray-400 text-sm truncate">{p.description}</div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {p.techStack?.slice(0, 3).map(t => (
                            <span key={t} className="px-2 py-0.5 bg-indigo-500/15 text-indigo-300 rounded text-xs">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDeleteProject(p._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          <FiTrash2 size={15} />
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-lg font-bold mb-6">Messages ({messages.length})</h2>
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m._id} className={`glass rounded-xl p-4 ${!m.isRead ? 'border-l-2 border-indigo-500' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{m.name}</span>
                            <span className="text-gray-500 text-xs">{m.email}</span>
                            {!m.isRead && <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs">New</span>}
                          </div>
                          <div className="text-indigo-300 text-sm font-medium mb-1">{m.subject}</div>
                          <div className="text-gray-400 text-sm">{m.message}</div>
                          <div className="text-gray-600 text-xs mt-2">{new Date(m.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {!m.isRead && (
                            <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleMarkRead(m._id)}
                              className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20">
                              <FiMail size={15} />
                            </motion.button>
                          )}
                          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDeleteMessage(m._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                            <FiTrash2 size={15} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center py-12 text-gray-500">No messages yet</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
