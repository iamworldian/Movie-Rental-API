const mongoose = require('../mongoConnection')
const jwt = require('jsonwebtoken')
const config = require('config')



const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    email : {
        type : String,
        unique : true,
        required : true,
        maxlength : 50,
    },
    password : {
        type : String,
        required : true,
        maxlength : 1000,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id} , config.get('jwtPrivateKey'));
    return token;
}

const UserModel = mongoose.model('Users' , userSchema)

module.exports = {UserModel , userSchema}