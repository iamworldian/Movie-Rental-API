const express = require('express')

const {CustomerModel} = require('../models/customerModel')
const auth = require('../middleware/authMiddleware')


const router = express.Router()

router.get('/' , async (req , res) => {
    try{
        await CustomerModel.find({}).sort('name')
            .then(result => res.send(result))
    } catch (err) {
        let error = {}

        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
});



router.post('/' , auth , async (req , res) => {
   
    const customer = new CustomerModel({
        name : req.body.name,
        isGold : req.body.isGold,
        phone : req.body.phone,
    })

    try{
        await customer
        .save()
        .then(result => res.send(result));
        
    } catch (err) {
        let error = {}

        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
})


router.put('/:id' ,auth , async (req , res , next) => {

    try{
        await CustomerModel.findByIdAndUpdate(req.params.id , {
            name : req.body.name,
            isGold : req.body.isGold,
            phone : req.body.phone,
            new : true
        }).then(result => {
            console.log(result)
            if(!result)res.status(404).send('Customer with given ID not found')
            else res.send(result)
        })

    } catch (err) {
        next(err)
    }

})


router.delete('/:id' , async (req , res , next) => {
    try{
        await CustomerModel
                .findByIdAndDelete(req.params.id)
                .then(result => {
                    if(!result)res.status(404).send('Customer with given ID not found')
                    else res.send(result)
                })
    } catch (err) {
        next(err)
    }
})


module.exports = router