const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
// require connection database
require("./database");

//bring in routes
const postRoutes = require("./routes/post");

//midlewares
// see time of response
app.use(morgan("dev"));

app.use("/", postRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Node Js API is listening on port: ${port}`);
});