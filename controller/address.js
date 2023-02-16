const express = require('express')
const app = express()
const cors = require('cors')
const route = express.Router()
const companiesmodel = require('../model/companies')
const { count } = require('../model/companies')



route.get('/city/:q',(req, res) =>{    
    try {
        const q = req.params.q 
        console.log(req.params.q);   
companiesmodel.find({Address:{$elemMatch:{city:q}}}, function (error, info) {
    if (error){
        return (error);
       }else {
        res.send({count: info.length, info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get by state
route.get('/state/:s',(req, res) =>{    
    try {
        const s = req.params.s 
        console.log(req.params.s);   
companiesmodel.find({Address:{$elemMatch:{state:s}}}, function (error, info) {
    if (error){
        return (error);
       }else {
        res.send({count:info.length, info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
// get by pin
route.get('/pin/:p',(req, res) =>{    
    try {
        const p = req.params.p 
        console.log(req.params.p)
//{Address:{$elemMatch:{pin:"1246957"}}}

companiesmodel.find({Address:{$elemMatch:{pin:p}}}, function (error, info) {
    if (error){
        return (error);
       }else {
        res.send({count:info.length,info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
//get any
route.get('/place/:p',(req, res) =>{    
    try {
        const p = req.params.p 
        console.log(req.params.p)
        let places = p?.split(",")||[]

companiesmodel.find({"Address.city":{$all:places}}, function (error, info) {
//companiesmodel.find({Address:{$elemMatch:{city:{$in:places}}}}, function (error, info) {
    
if (error){
        return (error);
       }else {
        res.send({count:info.length,info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});

// get state
route.get('/state',(req, res) =>{    
    try {
        const {r} = req.query 
        console.log(req.query)
        let places = r?.split(",")||[]
       // companiesmodel.find({Address:{$elemMatch:{state:{$in:places}}}}, function (error, info) {
     companiesmodel.find({Address:{$elemMatch:{state:{$all:places}}}}, function (error, info) {


    
if (error){
        return (error);
       }else {
        res.send({count:info.length,info:info})  
        console.log({info});   
       }
    })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});



module.exports = route
