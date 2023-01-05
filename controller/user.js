// const express = require("express");
// const app = express();
// const userModel = require("../model/user")



const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
const userModel = require('../model/user')
app.use(cors());
router.post('/add', (req, res) => {
    let todo = new userModel(req.body)
    todo.save()
        .then(todo => {

            res.status(200).json({ 'Todo': 'Todo added successfuly' })
        })
        .catch(err => {
            res.status(400).send("failed")
        })
})
module.exports = router