const express = require('express');
const joi = require('joi');

const auth = require('../middleware/authMiddleware')
const {GenreModel} = require('../models/genreModel')

//const fileModule = require('../fileSystem');

const router = express.Router();

router.get('/' , async (req , res , next) => {
    try{
        await GenreModel.find({}).sort('name')
            .then(result => res.send(result))
    } catch (err) {
        next(err)
    }
});

router.post('/' , auth , async (req , res , next) => {
    const report = checkValidation(req.body)
    
    if(report)return res.send(report.details[0].message)

    const genre = new GenreModel({
        name : req.body.name
    })

    try{
        await genre
        .save()
        .then(result => res.send(result));
        
    } catch (err) {
         next(err)
    }
})

router.put('/:id'  , async (req , res , next) => {
    const err = checkValidation(req.body);

    if(err) return res.status(404).send(err.details[0].message)

    try{
        await GenreModel.findByIdAndUpdate(req.params.id , {
            name : req.body.name,
            new : true
        }).then(result => {
            if(!result)res.status(404).send('Genre with given ID not found')
            else res.send(result)
        })

    } catch (err) {
        next(err)
    }

})

router.delete('/:id' ,auth , async (req , res) => {
    try{
        await GenreModel
                .findByIdAndDelete(req.params.id)
                .then(result => res.send(result))
    } catch (err) {
        next(err)
    }
})


const checkValidation = (body) => {
    const schema = {
        name : joi.string().required()
    }

    const report = joi.validate(body , schema);

    return report.error;
}

module.exports = router;