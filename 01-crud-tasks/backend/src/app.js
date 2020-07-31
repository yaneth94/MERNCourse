const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());
// para manejar los formularios que se envian en body x-wwww
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
//app.get("/api/users", (req, res) => res.send("Users Routes"));
//app.get("/api/notes", (req, res) => res.send("Notes Routes"));
app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));

module.exports = app;