import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// SIGNUP CONTROLLER
export let signup = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      const error = new Error("This email is already in use!");
      error.statusCode = 404;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User Registered!" });
  } catch (err) {
    next(err);
  }
};

// LOGIN CONTROLLER
export let login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    // Checking User email
    if (!user) {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      throw error;
    }

    // Checking User password
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong Password!");
      error.statusCode = 401;
      throw error;
    }

    // If everything checks out, send back JWT and the info we wish to send.
    // TOKEN ===================================
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "secretkey",
      { expiresIn: "1h" }
    );
    // TOKEN ===================================

    res.status(200).json({
      token: token,
      _id: user._id.toString(),
      message: "Logged in Successfully",
    });
  } catch (err) {
    next(err);
  }
};
