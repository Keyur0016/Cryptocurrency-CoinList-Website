const mongoose = require('mongoose') ; 
const DatabaseURL = "mongodb://localhost:27017/" ;  

const ConnectToDatabase = () =>{
    mongoose.connect(DatabaseURL, () => {
       console.log("Connection Setup Successfully") ; 
    }) ; 
}


module.exports = ConnectToDatabase