const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function userSignUp(req, res) {
    const { password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', error: true });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      ...req.body,
      role: 'user', 
      password: hashedPassword
    };

    const userData = await UserModel.create(payload);
    const savedUser = await userData.save();
    res.status(201).json({ 
        message: 'User created successfully', 
        user: savedUser, 
        error: false,
        success: true
    });
  } catch (error) {
        res.status(500).json({ 
        message: 'Error creating user', 
        error: error.message,
        success: false
    });
  }
}

module.exports = userSignUp;