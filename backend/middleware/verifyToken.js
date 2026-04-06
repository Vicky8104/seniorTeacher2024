const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX (IMPORTANT)
    // req.user = {
    //   id: decoded.id,
    //   post: decoded.post,
    //   subject: decoded.subject
    // };
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyToken };