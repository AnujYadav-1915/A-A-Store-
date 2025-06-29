const UserModel = require('../models/userModel');

async function isAdmin(req, res, next) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: User not found',
        success: false,
        error: true,
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden: Admins only',
        success: false,
        error: true,
      });
    }

    next(); // ✅ allow access
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Server error',
      success: false,
      error: true,
    });
  }
}

module.exports = isAdmin;
