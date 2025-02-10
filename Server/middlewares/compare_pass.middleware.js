const bcrypt = require("bcryptjs");
const { User } = require("../models/index");

const comparePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Attach user object to the request (excluding password)
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      area_id: user.area_id,
      team_id: user.team_id,
    };

    next();
  } catch (error) {
    console.error("Password comparison error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = comparePassword;
