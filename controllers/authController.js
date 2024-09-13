const gravatar = require("gravatar");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../services/authService");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const avatarURL = gravatar.url(email, { s: "200", d: "retro" }, true);
    const newUser = await registerUser({
      username,
      email,
      password,
      avatarURL,
    });
    return res.status(201).json({
      message: "User created",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser({ email, password });
    return res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await logoutUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};
