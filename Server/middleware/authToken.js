const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login...!",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log("JWT Verification Error:", err);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false
        });
      }

      // console.log("Decoded JWT:", decoded);

      req.userId = decoded._id;

      // console.log("UserId:", req.userId);
      next(); 
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
