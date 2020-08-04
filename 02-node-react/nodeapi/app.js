const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
// require connection database
require("./database");

//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

//midlewares
// see time of response
app.use(morgan("dev"));
// form body x-wwww
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// router
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Node Js API is listening on port: ${port}`);
});