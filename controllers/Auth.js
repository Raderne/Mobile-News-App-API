const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("Bu e-posta adresiyle zaten bir kullanıcı var");
  } else {
    const newUser = await User.create(req.body);
    const token = newUser.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({ id: newUser._id, email: newUser.email, token });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Lütfen e-posta ve şifre girin");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials (email)");
  }

  // compare pass
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials (password)");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    token,
  });
};

module.exports = { register, login };
