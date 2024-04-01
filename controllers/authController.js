import bcrypt from "bcrypt";
import Jimp from "jimp";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { User } from "../models/user.js";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email } = req.body;
  const url = gravatar.url(email);

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL: url,
    password: hashPassword,
  });

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
  const { email, _id: id } = req.user;
  console.log(id);

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

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;

  if (!req.file) {
    throw HttpError(401, "Not authorized");
  }
  console.log(req.file);
  const { path: oldPath, filename } = req.file;

  const image = await Jimp.read(oldPath);
  image.resize(250, 250).write(oldPath);

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const avatar = path.join("public", "avatars", filename);

  const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);
  await updateUser({ _id: id }, { avatarURL: avatar });

  res.status(200).json({
    avatarURL: avatar,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
