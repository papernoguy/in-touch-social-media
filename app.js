// TO START THE SERVER: npm start (or: npm run dev)
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const userCommunityRouter = require("./routes/userCommunityRoutes");
const adminCommunityRouter = require("./routes/adminCommunityRoutes");
const session = require("express-session");
const flash = require("connect-flash");
const authorization = require("./services/authorization");

//const errorHandler = require("./services/error-handler");
const app = express();
app.use(express.json());
//app.use(errorHandler);

app.use(
  session({
    secret: "foo",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(flash());
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", __dirname + "/public"); // Specify the views directory
app.use(logger("dev"));
app.use(express.json()); //to parse json data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//public routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

//session routes
app.use('/community', authorization.isLoggedIn);
app.use("/community", userCommunityRouter);

//admin routes
app.use('/admin', authorization.isLoggedIn);
app.use('/admin', authorization.isAdmin);
app.use("/admin", adminCommunityRouter);







const { connectToDatabase, disconnectFromDatabase } = require("./config/db");

connectToDatabase();

process.on("SIGINT", () => {
  // Disconnect from the database
  mongoose.connection.close(() => {
    console.log("Disconnected from the database.");
    process.exit(0);
  });
});
app.on("close", () => {
  db.close(() => {
    console.log("Disconnected from the database.");
  });
});
// Add the error-handling middleware








    module.exports = app;