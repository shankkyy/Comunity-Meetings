const bcrypt = require('bcrypt');
const userModel = require('./userModel');
const createHttpError = require('http-errors');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email already exists!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    next(createHttpError(500, "Error while creating user."));
  }
};

module.exports = { createUser };
