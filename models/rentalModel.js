const mongoose = require('../mongoConnection')
const {customerSchema} = require('./customerModel');
const {movieSchema} = require('./movieModel')


const rentalSchema = mongoose.Schema({
    customer : {
        type: customerSchema,
        required:true
    },
    movie : {
        type : movieSchema,
        required : true
    },
    dateOut : {
        type : Date,
        default : Date.now,
        required : true
    },
    dateReturned : {
        type: Date
    },
    rentalFee : {
        type : Number
    }
})


const RentalModel = mongoose.model('Rentals' , rentalSchema)

module.exports = {RentalModel , rentalSchema}