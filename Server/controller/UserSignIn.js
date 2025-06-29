const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');


async function userSignIn(req, res) {
  

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required', error: true });
    }


    
    const user = await UserModel.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: 'User not found', error: true });
    }

    const checkPassword = async (password, hashedPassword) => {
      return await bcrypt.compare(password, hashedPassword);
    };

    if(checkPassword){
      const tokenData = {
          _id: user._id,
          email: user.email,
        }
      const token = await jwt.sign(
        tokenData,
        process.env.JWT_SECRET,
        { expiresIn: 60* 60 * 24 } // Token valid for 1 day
      );

      tokenOptions = {
        httpOnly: true,
        secure: true, 
        sameSite: 'None',
      };
      res.cookie('token', token, tokenOptions).json({
        message: 'User signed in successfully',
        success: true,
        error: false,
        data : token
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error signing in user', 
      error: error.message,
      success: false,
      error: true
    });
  }
}

module.exports = userSignIn;