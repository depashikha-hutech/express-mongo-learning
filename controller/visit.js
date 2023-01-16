const express = require('express')
const app = express()
const cors = require('cors')
const route = express.Router()
const companiesmodel = require('../model/companies')
// get any 
route.get('/any',(req, res) =>{    
    try {
        const { d } = req.query  
        console.log(req.query);  
        let  visits=(d?.split(",") ||[]).map(n=>+n)
        console.log(visits);
   //companiesmodel.find({dailyvisits:{$in:[43,89]}}, function (error, info) {
   companiesmodel.find({dailyvisits:{$in:visits}}, function (error, info) {
    if (error){
        return (error);
       }else {
        res.send({info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
})

route.get('/all',(req, res) =>{    
    try {
        const {v} = req.query 
        console.log(req.query);   
       // {dailyvisits:{$all:[100,89]}}
       const visits=(v.split(",")||[]).map(m =>+m)

companiesmodel.find({dailyvisits:{$all:visits}}, function (error, info) {

    if (error){
        return (error);
       }else {
        res.send({info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
 
 module.exports = route
