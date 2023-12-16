const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/");

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Token sağlanmadı");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, name } = decoded;
    req.user = { _id, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authorizationMiddleware;
