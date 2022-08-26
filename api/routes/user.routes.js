const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../helpers/jwt-middleware");

const User = require("../models/User");

const userRouter = Router();

const signupValidator = [
  check("username").exists().isLength({ min: 4, max: 12 }),
  check("password").exists().isLength({ min: 6, max: 32 }),
  check("passwordCheck").exists().isLength({ min: 6, max: 32 }),
];

const loginValidator = [
  check("username").exists().isLength({ min: 4, max: 12 }),
  check("password").exists().isLength({ min: 6, max: 32 }),
];

const sanitizeUser = (user) => ({
  ...user.toJSON(),
  password: undefined,
});

// signup
userRouter.post("/signup", [...signupValidator], async (req, res) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { username, password, passwordCheck } = req.body;

  // Make sure username is not taken
  const userFound = await User.findOne({ username });
  if (userFound) {
    return res.status(400).send({ errors: "username taken" });
  }
  // Check to see if passwords do not match
  if (password !== passwordCheck) {
    return res.status(400).send({ errors: "passwords do not match" });
  }

  const user = await User.create({
    username,
    password: bcrypt.hashSync(password, 10),
  });

  res.send(sanitizeUser(user));
});

// login
userRouter.post("/login", [...loginValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.sendStatus(418); // 401
  }

  const correctPassword = bcrypt.compareSync(password, user.password);
  if (!correctPassword) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY, {
    expiresIn: "30 days",
  });

  res.send({ token });
});

userRouter.get("/profile", jwtMiddleware, async (req, res) => {
  const reqUser = req.user._id
  console.log(reqUser);
  const userdata = await User.findOne({ _id: reqUser });
  const sanUser = sanitizeUser(userdata);
  res.send(sanUser);
});

module.exports = userRouter;