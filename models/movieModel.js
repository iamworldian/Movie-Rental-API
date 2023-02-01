const mongoose = require('../mongoConnection')
const {genreSchema} = require('../models/genreModel')


const movieSchema = mongoose.Schema({
    title : {
        type: String,
        required : true,
        maxlength : 200
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true
    },
    dailyRentalRate : {
        type : Number,
        required : true
    }
})

const MovieModel = mongoose.model('Movies' , movieSchema)

module.exports = {MovieModel,movieSchema}