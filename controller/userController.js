const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  let { email, name, password } = req.body;
  let isUserPresent = await UserModel.findOne({ email });
  if (isUserPresent) {
    res.send("User already exist... Please login");
  } else {
    bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.send("Something went wrong please try again later");
      }
      if (hash) {
        let user = new UserModel({ email, name, password: hash });
        await user.save();
        res.send("Signup Successfull");
      }
    });
  }
  //   console.log("user Presnet", isUserPresent);
  //   console.log("data bod form signup con...", email, " ;;;;  ", name, password);
};

const login = async (req, res) => {
  let { email, password } = req.body;
  let isUserPresent = await UserModel.findOne({ email });
  if (!isUserPresent) {
    res.status(200).send("User not Found, Please Signup first");
  } else {
    bcrypt.compare(password, isUserPresent.password, function (err, result) {
      if (err) {
        console.log("decrypt err: ", err);
        res.send("Something went wrong please try again later");
      }
      if (result) {
        console.log("decrypt result: ", result);
        var token = jwt.sign(
          { USERID: isUserPresent._id, name: isUserPresent.name },
          process.env.SECRECT_KEY
        );
        res.status(200).send({
          message: "Login Success",
          token: token,
          name: isUserPresent.name,
          userId: isUserPresent._id,
        });
      } else {
        res.send("Please give correct password");
      }
    });
  }
};

module.exports = { signup, login };
