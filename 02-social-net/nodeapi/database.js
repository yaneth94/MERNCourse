const mongoose = require("mongoose");
const URI = process.env.MONGO_URI || "mongodb://localhost/testmern";

//db
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database is connected ");
});