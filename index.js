const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
 const adder = require('./controller/user')
 const companyroute = require('./controller/companies')
 const visitroute = require('./controller/visit')
 const addressroute = require('./controller/address')
const app = express()
const user = require("./model/db")
app.use(cors());
app.use(bodyParser.json())

app.use("/user", adder);
app.use("/company",companyroute);
app.use("/company/dailyvist",visitroute);
app.use("/company/address",addressroute);
app.listen("4003", () => {
    console.log("Server Started at port 4003");
});



