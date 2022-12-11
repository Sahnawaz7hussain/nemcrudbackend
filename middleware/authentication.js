require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRECT_KEY;

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.token;
    //  console.log("middleware token: ", token);
    var decoded = await jwt.verify(token, secret_key);
    req.body.userId = decoded.USERID;
    // console.log("decoded token,BODY: ", req.body);
    next();
  } catch (err) {
    // err
    console.log("middleware error:", err.message);
    res.send("Not authenticated Please Login ...");
  }
};

module.exports = { authentication };
