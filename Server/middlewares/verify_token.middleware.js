const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token;

    console.log("Hello >>>>>> ", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No access token provided." });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }

      req.user = decoded; // Attach decoded user data (id, email, role) to request

      next(); // Proceed to the next middleware/controller
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
