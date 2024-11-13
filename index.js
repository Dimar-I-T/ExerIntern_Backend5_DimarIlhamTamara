const express = require("express");
const app = express();
const user_router = require('./routes/user_routes');
const chat_router = require('./routes/chat_routes');
require("./mongo.config").connectDB();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use('/user', user_router);
app.use('/chat', chat_router);

app.listen(port);