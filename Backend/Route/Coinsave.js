const express = require('express') ;
const Router = express.Router() ; 
const Coin_schema = require('../Module/Coin') ; 


// Router for save coin data 

Router.post('/save', async (req,res) => {
    let Username = req.body.Username ; 
    let CoinName = req.body.Name ; 
    let CoinImage = req.body.Image ; 
    let CoinMarketCap = req.body.Cap ; 
    let CoinRank = req.body.Rank ; 
    let CoinId = req.body.Id ;

    try {
        
        // First check coinm already save or not 

        const FindCoin = await Coin_schema.find().where({"username":Username,"CoinName":CoinName}) ; 
        
        if (FindCoin.length != 0 ){
            return res.status(400).json({"Status":"Already save"}) ; 
        }
        else{

            const NewCoinData = await Coin_schema({
                'username' : Username , 
                'CoinName' : CoinName, 
                'CoinImage' : CoinImage, 
                'CoinMarketCap' : CoinMarketCap,
                'CoinRank': CoinRank,
                'CoinId' : CoinId
            }) ; 

            NewCoinData.save() ; 

            return res.status(200).json({"Status": 'Save successfully'}) ; 
        }
        

    } catch (error) {
        return res.status(400).json({"Status": error.message}) ; 
    }
}) ; 

// Router for get all coin data 

Router.post("/get", async (req,res) => {
    
    let Username = req.body.Username ; 

    try {
        
        const AllCoinData = await Coin_schema.find().where({"username":Username}) ; 
        
        return res.status(200).json({"Status":AllCoinData}) ; 

    } catch (error) {
        return res.status(400).json({"Status": error.message}) ; 
    }
})

// Router for delete coin data 

Router.post('/delete', async (req,res) => {
    let Username = req.body.Username ; 
    let CoinName = req.body.Name ; 

    try {
        const DeleteCoin = Coin_schema.remove({"username": Username, 'CoinName': CoinName}) ; 
        DeleteCoin.exec() ; 
        return res.status(200).json({"Status": "Delete"}) ; 
    } catch (error) {
        return res.status(400).json({"Status": error.message}) ; 
    }

})

module.exports = Router ; 