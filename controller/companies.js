const express = require('express')
const app = express()
const cors = require('cors')
const route = express.Router()
const companiesmodel = require('../model/companies')
route.post('/addcompany', (req, res) => {
    let info = new companiesmodel(req.body)
    info.save()
        .then(info => {

            res.status(200).json({ 'info': info })
        })
        .catch(err => {
            res.status(400).send("failed")
        })
})


route.get('/get',(req, res) =>{    
     try {
         const {q} = req.query 
         console.log(req.query);   
 //companiesmodel.find({products:{$elemMatch:{name:q}}}, function (error, info) {
 companiesmodel.find({relationships:{$elemMatch:{"person.first_name":q}}}, function (error, info) {

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
 //get all
 route.get('/city/all',(req, res) =>{    
    try {
        const {q} = req.query 
        console.log(req.query);   
companiesmodel.find({City:{$all:q.split(",")}}, function (error, info) {

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
// get by id
 route.get('/:id', (req, res) => {
    try{
     let id = req.params.id
    companiesmodel .findById(id, (error, info) => {
        if (!error){
         res.json(info)
        }else {
            console.log(error);
        }
     })
    }catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
 });
// get any 
route.get('/city/any',(req, res) =>{    
    try {
        const { c } = req.query    
        let  cities=c?.split(",") ||[]
   companiesmodel.find({City:{$in:cities}}, function (error, info) {
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


module.exports = route