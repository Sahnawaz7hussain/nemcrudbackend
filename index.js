const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { blogRoute } = require("./routes/blogRoute");
const { authentication } = require("./middleware/authentication");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.use("/user", userRoute);
//app.use(authentication);
app.use("/blog", authentication, blogRoute);

app.listen(PORT, async () => {
  try {
    console.log("Connecting to db.");
    await connection;
    console.log("Connected with db successfully");
    console.log(`server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log({ err: err.message, message: "Failed to connect with db." });
  }
});
