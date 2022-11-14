const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { cookieJWT } = require("./middlerware/cookieJWT");
const cookieParser = require("cookie-parser");
const app = express();
const port=3000
mongoose.connect("mongodb+srv://letuanta15f:2525123@cluster0.sxhqrvc.mongodb.net/?retryWrites=true&w=majority", () => {
 console.log("MongoDB is connected");
  });
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
// route
const userRouter = require("./routes/user");

//useRoute
app.use("/",userRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });