// Setup MongoDB Database Connection

const ConnectToDatabase = require("./db");

ConnectToDatabase() ; 

// Setup Expressjs Route Connection

const express = require('express') ; 
const app = express() ; 
const cors = require('cors') ; 
const port = 5000 ; 

app.use(express.json()) ;
app.use(cors()) ;  

app.use('/user/', require('./Route/User')); 
app.use('/coin', require('./Route/Coinsave')) ; 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})