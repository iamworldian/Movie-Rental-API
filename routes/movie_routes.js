const express = require('express');
const { GenreModel } = require('../models/genreModel');
const {MovieModel} = require('../models/movieModel')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/' , async (req , res) => {
    try{
        await MovieModel.find({}).sort('name')
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

        const genre = await GenreModel.findById(req.body.genreId)
        console.log(genre);
        if(!genre)return res.status(400).send('Genre Not Found Error')

        const movie = new MovieModel({
            title : req.body.title,
            genre : {
                _id : genre._id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        })

        await movie
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

module.exports = router

