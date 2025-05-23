const express = require("express");
const databaseConnection = require("./DB/dbConfig");
require("dotenv").config();
const userRouter = require("./Routes/userRoutes");
const blogRouter = require("./Routes/blogRoutes");
const commentRouter = require("./Routes/commentRouter");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./Middlewares/Auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Request recieved at ${req.url} for method : ${req.method} , request body : ${req}`);
  next();
});


//routes
app.use(userRouter);
app.use(userAuth,blogRouter);
app.use(userAuth,commentRouter);



databaseConnection().then(res => {
  console.log("Database connection successfull !!");
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Identity Server is listening at port ${process.env.PORT || 3001}`)
  });
})
  .catch(error => {
    console.log(error.message || "Something went wrong");
  })


