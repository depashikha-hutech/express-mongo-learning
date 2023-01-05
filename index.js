const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
 const adder = require('./controller/user')
const app = express()
const user = require("./model/db")
app.use(cors());
app.use(bodyParser.json())

app.use("/user", adder);

app.listen("4003", () => {
    console.log("Server Started at port 4003");
});



