const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = userAuth;
