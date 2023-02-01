const moongoose = require('../mongoConnection')

const genreSchema = moongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 15,
        validate: /^[a-zA-Z ]*$/,
    }
})


const GenreModel = moongoose.model('Genres' , genreSchema)

module.exports = {GenreModel , genreSchema}
