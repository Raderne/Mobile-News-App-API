const { CustomAPIError } = require("../errors/");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Bir şeyler yanlış gitti daha sonra tekrar deneyin");
};

module.exports = errorHandlerMiddleware;
