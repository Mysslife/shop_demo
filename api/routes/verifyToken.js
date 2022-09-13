const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, userJwtInfo) => {
      if (err) res.status(403).json("Invalid token!");

      req.userJwtInfo = userJwtInfo;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

// VERIFY TOKEN AND AUTHORIZATION - USER:
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.params.id === req.userJwtInfo.id || req.userJwtInfo.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

// VERIFY TOKEN AND AUTHORIZATION - ADMIN:
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.userJwtInfo.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
