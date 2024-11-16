const express = require("express");
const app = express();
const user_router = require('./src/routes/user_routes');
const chat_router = require('./src/routes/chat_routes');
require("./src/config/mongo.config").connectDB();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use('/user', user_router);
app.use('/chat', chat_router);

app.listen(port);