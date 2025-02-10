const verifyRole = (requiredRoles) => {
  return (req, res, next) => {
    try {
      // Log user body in stringify format
      console.log(JSON.stringify(req.user));
      if (!req.user || !req.user.role) {
        return res
          .status(403)
          .json({ message: "Unauthorized: Role information missing" });
      }

      if (!requiredRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Unauthorized: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Error verifying role:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = verifyRole;
