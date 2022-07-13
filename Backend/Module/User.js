const mongoose = require('mongoose') ; 
const {Schema} = mongoose ; 

const User_schema = new Schema({
    'Username':{
        type: String,
        required: true
    },
    'password':{
        type:String,
        required:true
    }, 
    'Date':{
        type:String,
        default:Date
    }
}) ; 


module.exports = mongoose.model("User", User_schema) ; 