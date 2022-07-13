const mongoose = require('mongoose') ; 
const {Schema} = mongoose ; 

const Coin_schema = new Schema({
    'username':{
        type:String,
        required: true
    }, 
    'CoinName':{
        type:String,
        required:true
    }, 
    'CoinImage':{
        type:String,
        required:true
    },
    'CoinMarketCap':{
        type:String,
        required:true
    } ,
    'CoinRank':{
        type:String,
        required:true
    },
    'CoinId':{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Coin",Coin_schema) ; 