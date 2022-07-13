const express = require('express');
const bcrypt = require('bcrypt') ; 
const Router = express.Router() ; 
const User_schema = require('../Module/User') ; 
const Coin_schma = require('../Module/Coin') ; 

// New user post request

Router.post('/new_user', async (req,res) => {

    let Username = req.body.Username ; 
    let Password = req.body.Password ; 
    
    try {

        // Check this Emailaddress already login or not 
        
        let Email_check = await User_schema.find().where({"Username":Username}) ; 

        if (Email_check.length >= 1){
            return res.status(400).json({"Status":"Find user"}) ; 
        }
        else{
            
            // Here, Emailaddress not find in Database 
            
            // 1. Create Hash of Password 

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(Password, salt);

            // 2. Create User data entry in Database 

            try {
                
                const create_new_user = await User_schema({
                    'Username':Username , 
                    'password':hash
                }) ; 
                create_new_user.save() ; 

                return res.status(200).json({"Status":"Create user successfully"}) ; 

            } catch (error) {
                return res.status(400).json({"Status":error.message}) ; 
            }
        }

    } catch (error) {
        return res.status(400).json({"Staus":error.message}) ; 
    }
}) ; 

// Login user post request

Router.post('/login_user',  async (req,res) => {

    // Login Emailaddress and Login Password 

    let Login_Username = req.body.Username ; 
    let Login_Password = req.body.Password ; 

    try {

        let DB_Password_data = await User_schema.find().where({Username:Login_Username}) ; 

        if (DB_Password_data.length != 0){
            
            let DB_Hash_password = DB_Password_data[0].password ; 
            const validPassword = await bcrypt.compare(Login_Password, DB_Hash_password);
            
            if (validPassword){
                
                return res.status(200).send({"Status": "Match Password"}) ; 
            }
            else{

                return res.status(400).send({"Status": "Invaild Password"}) ; 

            }
            
        }
        else{
            return res.status(400).send({"Status":"This emailaddress is not register"}) ; 
        }
        
    } catch (error) {
        return res.status(400).json({"Status":error.messaeg}) ; 
    }
}) ; 

module.exports = Router ; 