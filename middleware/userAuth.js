const userAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    next();
  } else {
    res.status(401).json({
      message: "no token / unAuth",
      data: null,
    });
  }
}; 

module.exports = userAuth;

