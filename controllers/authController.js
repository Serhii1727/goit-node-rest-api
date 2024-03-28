import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { User } from "../models/user.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const validtePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword);

  const comparePassword = await validtePassword(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  console.log(token);

  const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);

  await updateUser({ _id: id }, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
    subscription: "starter",
  });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);

  await updateUser({ _id: id }, { token: "" });

  res.status(204).json();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
