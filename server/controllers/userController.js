import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { ErrorHandler } from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";

import { sendToken } from "../utils/sendingJWTtoken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, walletAddress } = req.body;
  if (!name || !email || !password) {
    return new ErrorHandler("Enter all fields", 400);
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "user already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hp = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hp,
    walletAddress,
  });

  if (user) {
    sendToken(user, 200, res);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter all fileds", 400));
  }
  const userExists = await User.findOne({ email }).select("+password");
  if (!userExists) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    sendToken(userExists, 201, res);
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const newData = { name: req.body.name, email: req.body.email };

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateUserRole = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  await User.findOneAndRemove({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
