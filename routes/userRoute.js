const express = require("express");
const { signup, login } = require("../controller/userController");

const userRoute = express.Router();
// const loginRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);

module.exports = { userRoute };
