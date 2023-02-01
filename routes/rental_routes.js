const express = require('express');


const { CustomerModel } = require('../models/customerModel');
const { MovieModel } = require('../models/movieModel')
const { RentalModel } = require('../models/rentalModel')
const auth = require('../middleware/authMiddleware')

const router = express.Router()




router.get('/me' , async (req , res) => {

    try{
        await RentalModel.find({}).sort('name')
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
   
    try{
        
        const customer = await CustomerModel.findById(req.body.customerId)
        //console.log(customer);
        if(!customer)return res.status(400).send('Customer Not Found Error')

        const movie = await MovieModel.findById(req.body.movieId)
        //console.log(movie);

        if(!movie)return res.status(400).send('Movie Not Found Error')


        movie.numberInStock--;

        const rental = new RentalModel({
            customer : customer,
            movie : movie,
        })
        
         await rental.save()
         await movie.save()

         res.send(rental);
         
        
         
    } catch (err) {
        let error = {}

        for(field in err.errors){
           error[field] = err.errors[field].message;
        }

        res.send(error)
    }
})

module.exports = router

