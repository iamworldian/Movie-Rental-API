const express = require('express');
const joi = require('joi')
const bcrypt = require('bcrypt')


const { UserModel } = require('../models/userModel');



const router = express.Router()

router.get('/' , async (req , res) => {
    try{
        await UserModel.find({}).sort('name')
            .then(result => res.send(result))
    } catch (err) {
        let error = {}

        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
});

router.post('/' , async (req , res) => {
    
    try{

        const report = checkValidation(req.body)
        if(report) return res.status(400).send(report)

        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.send("This user dont exist"); 
        }

        const compare = await bcrypt.compare(req.body.password , user.password)
        if(!compare)return res.status(400).send('Invalid Username or Password')

        const token = user.generateAuthToken();
        res.send(token);
        
    } catch (err) {
        console.log('invoked catch' , err)
        let error = {}
 
        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
})

const checkValidation = (body) => {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password : joi.string().min(8).max(50).required()
    }
    const report = joi.validate(body , schema)
    return report.error;
}

module.exports = router 

