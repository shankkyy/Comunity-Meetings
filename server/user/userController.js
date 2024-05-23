const bcrypt = require('bcrypt');
const userModel = require('./userModel');
const createHttpError = require('http-errors');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ id: newUser._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User created successfully", user: newUser, accessToken: token });
  } catch (err) {
    next(createHttpError(500, "Error while creating user."));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = sign({ id: user._id }, process.env.SECRET, { expiresIn: "7d" });

    res.status(200).json({ accessToken: token });
  } catch (err) {
    next(createHttpError(500, "Error while logging in."));
  }
};

module.exports = { createUser, loginUser };
