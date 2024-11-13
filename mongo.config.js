const mongoose = require("mongoose");

exports.connectDB = async function () {
    const URI = "mongodb://localhost:27017/";
    const connectionParams = {};

    mongoose.set("strictQuery", false);

    mongoose
        .connect(URI, connectionParams)
        .then(() => console.info("Connected to mongodb"))
        .catch((err) => console.error("Error" + err.message));
};
