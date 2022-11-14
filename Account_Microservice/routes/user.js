const express = require("express");
const userRouter = express.Router();
const { User } = require("../modals/userModal");
const multer = require("multer");
const upload = multer();
const jwt=require("jsonwebtoken");



userRouter.post("/signup", upload.fields([]), async (req, res) => {
  const { username, email, password, name, date, gender } =req.body
  const newUser = {
    username,
    gender,
    date,
    email,
    password
  };
  
  const user = await User.findOne({ "account.email": email });
  if (user == null) {
    try{
    const tuser = new User(newUser);
    const saveUser = await tuser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }} else {
    res.status(500).json("tai khoan da ton tai")
  }
});
userRouter.post("/login", upload.fields([]), async (req, res) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({ "account.email": email });
    if(user==null){
      res.status(500).json("Tai khoan khong ton tai")
    }else{
      var token = jwt.sign(
        { id: user._id, username: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });
      res.status(200).json(token)
    }
  
});

module.exports = userRouter;