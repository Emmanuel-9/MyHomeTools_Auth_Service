require("dotenv").config()
require("./config/db").connect()

const express = require('express');
const app = express();
const cors = require("cors")
app.use( cors())
app.use(express.json())


app.use("/auth", require('./routes/authRoute'))



module.exports = app