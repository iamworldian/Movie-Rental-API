const mongoose = require('../mongoConnection')


const customerSchema = mongoose.Schema({
    name:{
        type : String,
        required:true,
        maxlength : 30,
        match : /^[a-zA-Z .]*$/,
    },
    phone:{
        type: String,
        required:true
    },
    isGold : {
        type:Boolean,
        required:true,
    }
})

const CustomerModel = mongoose.model('Customers' , customerSchema)

module.exports = {CustomerModel,customerSchema}