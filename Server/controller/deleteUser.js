const userModel = require("../models/userModel");

async function deleteUser(req, res) {
  try {
    const sessionUserId = req.userId; // ID of the logged-in user
    const targetUserId = req.params.id; // ID of the user to delete

    const sessionUser = await userModel.findById(sessionUserId);

    if (!sessionUser || sessionUser.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
        error: true,
        success: false,
      });
    }

    if (sessionUserId === targetUserId) {
      return res.status(400).json({
        message: "You cannot delete yourself.",
        error: true,
        success: false,
      });
    }

    if(targetUserId.role !== "admin") {
      return res.status(403).json({
        message: "You cannot delete an admin user.",
        error: true,
        success: false,
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(targetUserId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: deletedUser,
      message: "User deleted successfully.",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteUser;