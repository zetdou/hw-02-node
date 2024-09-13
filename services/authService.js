const User = require("./schemas/userSchema");
const jwt = require("jsonwebtoken");

const registerUser = async ({ username, email, password, avatarURL }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("This email is already taken!");
  }

  const newUser = new User({ username, email, avatarURL });
  await newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not exists!");
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Wrong password!");
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  user.token = token;
  await user.save();
  return {token, user: {email: user.email, subscriptin: user.subscription}};
};

const logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Not authorized");
  }
  
  user.token = null;
  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};