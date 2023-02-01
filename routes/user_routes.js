const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt')
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
  
const { UserModel } = require('../models/userModel');
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/me' , auth , async (req , res) => {
    try{
        await UserModel.find({_id : req.user._id}).select('-password')
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

        const report = checkValidation(req.body);

        if(report.length) return res.send(report)

        const findOneEmail = await UserModel.findOne({ email: req.body.email })

       // console.log(findOneEmail)

        if (findOneEmail) {
            return res.send("This email already used"); 
        }

        const user = new UserModel(_.pick(req.body , ['name' , 'email' , 'password']))
        //console.log(user)

        const salt = await bcrypt.genSalt(5)
        user.password = await bcrypt.hash(user.password , salt)
        
        const token = jwt.sign({_id:user._id} , config.get('jwtPrivateKey')); 

        await user
        .save()
        .then(result => res.header('x-auth-token', token).send(_.pick(result , ['name' , 'email'])));
        
    } catch (err) {
        let error = {}

        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
})

const checkValidation = (body) => {
    const schema = new passwordValidator()

    schema
    .is().min(8)
    .is().max(100)
    .has().digits(2)
    .has().lowercase(1)
    .has().uppercase(2)
    .has().symbols(1)
    .has().not().spaces()

    const report = schema.validate(body.password , {details : true})

    return report;
}

module.exports = router

