const Message = require('../models/Message');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalProjects, totalMessages, unreadMessages, totalSkills] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Skill.countDocuments(),
    ]);
    res.json({ success: true, data: { totalProjects, totalMessages, unreadMessages, totalSkills } });
  } catch (err) { next(err); }
};
