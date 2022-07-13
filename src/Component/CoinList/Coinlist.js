import React from 'react' ; 
import { useEffect,useState } from 'react';

// Import widget css from cssFile

import { CoinList,CoinListDiv,CList_Option,CList_Option_text, MarketCapTitle } from './CoinListCss';
import { CoinIndex_title,CoinRank_title,CoinName_title,CoinHigh_title, CoinPrice_title } from './ParCoinDivCss';
import { CoinIndex, CoinImage, CoinName, CoinImageName, CoinRank, CoinHigh, CoinLow, MarketCap, CoinPrice } from './ParCoinDivCss';
import { ExchangeNameTitle, WebsiteTitle, WebsiteData } from './ExchangeDivCss';


export default function Coinlist() {
    
    // --- Set Username value from cookies --- // 

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
   
    // Function --> Set cookie function

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
        
    const Username = getCookie("username") ; 


    // --- Get Page count value from URL --- // 

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let pageCount = parseInt(urlParams.get("page")) ; 
    
    if (!urlParams.has("page")){
        pageCount = 1 ; 
        window.location.assign("/?page=1"); 
    }


    // useState -> Store Fetch coin data     
    
    const [CoinData, CoinDataUpdate] = useState([]) ; 

    // CSS useState -> Store Spinner Div css 

    const [spinnerDisplay, spinnerDisplayUpdate] = useState({
        "display": "none",
        "marginTop": '1.7rem',
        "marginBottom": '1.2rem' }
    ); 

    // CSS useState -> For CoinList Division 

    const [coinList, coinListUpdate] = useState({
        "marginTop": '1.2rem', 
        'display': 'block'
    })

    // CSS useState -> For ExchangeList Division 

    const [exchangeList, exchangeListUpdate] = useState({
        "marginTop": '1.2rem',
        "display": 'none'
    })
    
    // CSS useState -> For Next and Previous Button 

    const [npButton, npButtonUpdate] = useState({
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '0.90rem',
        marginBottom: '0.90rem'
    })
    
    // Function -> Fetch coin data using page count value 

        
    const FetchCoinListRequest_option = async () => {

        let CoinListURL = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=${urlParams.get("page")}&per_page=100&order=market_cap_desc` ; 

        let CoinListRequest_Option = {
            method : 'GET',
            headers: {
              'X-RapidAPI-Key': 'fb786a2467msh65e01f24ab4e61ap17010ajsnbabe3670301a',
              'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        }
          
        const CoinList_request = await fetch(CoinListURL, CoinListRequest_Option); 
        const CoinList_request_response = await CoinList_request.json() ; 

        // Update CoinDataUpdate State 
        CoinDataUpdate(CoinList_request_response) ; 
    }
    
    // Function -> Fetch user save coinname and store coinname in below array

    const userCoinData = [] ; 

    const FetchUserCoinData = async () => {

        const GetCoinURL = 'http://localhost:5000/coin/get' ; 
        const GetCoinRequestOptionn = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body : JSON.stringify({
                "Username": Username
            })
        } ; 

        const GetCoin_request = await fetch(GetCoinURL, GetCoinRequestOptionn);
        const GetCoin_request_response = await GetCoin_request.json() ; 

        GetCoin_request_response.Status.map((element) => {
            userCoinData.push(element.CoinName) ; 
        })
        
        sessionStorage.setItem("coinname", JSON.stringify(userCoinData)) ; 

    }

    // Function  -> Fetch Exchange Data RequestFunction 

    const [exchangeData, exchangeDataUpdate] = useState([]) ; 

    const FetchExchangeData = async () => {

        const ExchangerURL = 'https://coingecko.p.rapidapi.com/exchanges' ; 
        const ExchangeRequestOption = {
            method: 'GET', 
            headers: {
                'X-RapidAPI-Key': 'fb786a2467msh65e01f24ab4e61ap17010ajsnbabe3670301a',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        }

        const Exchange_request = await fetch(ExchangerURL, ExchangeRequestOption) ; 
        const Exchange_request_response = await Exchange_request.json() ; 
        exchangeDataUpdate(Exchange_request_response) ; 
    }
  

    // useEffect hook 

    useEffect(() => {

        // Set Spinner Division
         
        spinnerDisplayUpdate({"display": 'block'}) ; 
        
        FetchCoinListRequest_option() ; 

        FetchExchangeData() ; 
        
        if (Username != ""){

            FetchUserCoinData() ; 
        }
        else{
            sessionStorage.setItem("coinname", JSON.stringify(userCoinData)) ; 

        }

        // Hide Spinner Division 
        
        spinnerDisplayUpdate({"display": 'none'}) ; 

    });
 

    // Function - CoinName Hover Effect 

    const HoverEffect = (event) => {
       event.target.style.color = 'black' ; 
    }
    
    // Function - CoinName RemoveHover Effect

    const HoverRemove = (event) =>{
        event.target.style.color = '#515151' ; 
    }


    // Coin, Exchange 

    // Function -> OptionText Hover Effect

    const OptionHover = (event) => {
        event.target.style.color = 'black'; 
    }

    // Function -> OptionText RemoveHover Effect

    const OptionRemoveHover = (event) => {
        event.target.style.color = "rgb(75,74,74)" ; 
    }

    // Function -> For load Next CoinList

    const NextButton = () => {
          
        pageCount = pageCount + 1 ; 
        window.location.href = '/?page=' + pageCount ; 
    }

    // Function -> For load Previous CoinList
    
    const PerviousButton = () => {

        pageCount = pageCount - 1 ; 
        if (pageCount == 0){
            window.location.href = "/?page=0";
        }
        else{
            window.location.href = '/?page=' + pageCount ; 
        }
        
    }

    // Function -> For load CoinList

    const CoinOnClick = () => {
        coinListUpdate({"display":'block'}) ; 
        exchangeListUpdate({"display":'none'}) ; 
        npButton({"display":'flex'}) ; 
    }

    // Function -> Set ExchangeList function 

    const SetExchangeList = () => {
         
        coinListUpdate({"display":'none'}) ; 
        exchangeListUpdate({"display":'block'}) ; 
        npButtonUpdate({"display":"none"}) ; 

    }

    // Function -> For load Particular CoinInformation 

    const CoinClick =  (element) => {
        sessionStorage.setItem("element", JSON.stringify(element)); 
        window.open("./CoinInfo", "_blank") ; 
        
    }

    // Function -> For Open Exchange website 

    const openExchangeWebsite = (website) => {
        window.open(website, '_blank');
    }

    const ProtfolioClick = () => {
        
        if (Username == ""){
            window.location.href = '/Signup' ; 
        }
        else{
            window.location.href = '/Protfolio' ; 
        }
    }


    // --- CoinList element widget css --- // 

    const ParticularCoin_title = {
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'left',
        borderBottom : '1px solid #e1e1e1',
        borderTop: `1px solid #bdbdbd` ,
        borderBottom: '1px solid #bdbdbd',
        paddingBottom: '0.60rem',
        paddingTop: '0.60rem',
        overflowX : 'hidden',
        backgroundColor: 'rgb(247,247,247)'
    }

    const ExchangeCoinDiv = {
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'left',
        borderBottom : '1px solid #e1e1e1',
        paddingBottom: '0.60rem',
        paddingTop: '0.60rem',
        overflowX : 'hidden',
        cursor:"pointer"
    }

    const ParticularCoin = {
        width: '100vw',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'left',
        borderBottom : '1px solid #e1e1e1',
        paddingBottom: '0.75rem',
        paddingTop: '0.7rem',
        overflowX : 'hidden',
        cursor: 'pointer'
    }

    const Button = {
        marginLeft: '1rem'
    }

    const UsernmeIcon = {
        marginTop: 'auto',
        marginBottom: 'auto', 
        display: 'flex', 
        textAlign: 'center',
        justifyContent: 'left',
        fontSize: '0.70rem',
        marginLeft: '0.60rem',
        cursor: 'pointer'
    }
    
    // var --> For Show CoinList Index

    var CoinStartIndex = (pageCount-1)*100 ; 

    // var -> For Show ExchangeList Index 

    var ExchangeStartIndex = 0 ; 


    return (
    <div className='CoinlistData' style={CoinList}>
    
        {/* Useraccount, CoinList, ExchangeList Division  */}

        <div className='CoinListDiv' id='CoinListScollDiv' style={CoinListDiv}>

            <div className='CList'>
                
                <div className='CList_Option' style={CList_Option}>
                
                    {/* Useraccount  */}
                    <div className='UsernameIcon' style={UsernmeIcon} onClick={ProtfolioClick}>
                        <i class="fa-solid fa-user fa-2x"></i>
                    </div>
    
                    {/* CoinList  */}
                    <h6 class="card-subtitle mb-2 " style={CList_Option_text} onMouseOut={OptionRemoveHover} onMouseOver={OptionHover}
                    onClick={CoinOnClick}>Coins</h6>
    
                    {/* ExchangeList  */}
                    <h6 class="card-subtitle mb-2 " style={CList_Option_text} onMouseOut={OptionRemoveHover} onMouseOver={OptionHover}
                    onClick={SetExchangeList}>Exchange Info</h6>
    
                </div>

            </div>

             
        {/* Cryptocurrency coinList main title   */}

        <div className='PriceByMarket_Title' style={MarketCapTitle}>Cryptocurrency price by Market Cap</div>
         
        {/* Loading spinner division  */}

        <div className='Spinner' style={spinnerDisplay}>

            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                </div>
            </div>

        </div>

        {/* Allcoin information division  */}
        
        <div className='AllCoin' id='AllCoinDiv' style={coinList}>

            {/* Title Row division */}

            <div className='Particular_coin' style={ParticularCoin_title}>

                    <div className='CoinIndex' style={CoinIndex_title} >#</div>
            
                    <div className="CoinName" style={CoinName_title}>Coin</div>
            
                    <div className='CoinRank' style={CoinRank_title}>Rank</div>
            
                    <div className='CoinPrice' style={CoinPrice_title}>Price</div>  
            
                    <div className='24High' style={CoinHigh_title}>24h High</div>  
            
                    <div className='25Low' style={CoinHigh_title}>24h Low</div>
            
                    <div className='MarketCap' style={CoinHigh_title}>Mkt Cap</div>    

            </div>
             
            {CoinData.map((element ) => {
                let IndianNumberFormat = Intl.NumberFormat("en-In") ; 
                
                CoinStartIndex ++ ; 
                return(
                    
                    // Particular coin Information Division 

                    <div className='Particular_coin' style={ParticularCoin} onMouseOver={HoverEffect}
                    onMouseOut={HoverRemove}>
                         
                        {/* CoinIndex  */}
                    
                        <div className='CoinIndex' style={CoinIndex} >{CoinStartIndex}</div>
                        
                        {/* CoinImage and CoinName division  */}
                    
                        <div className='CoinImageName' style={CoinImageName} >
                    
                            <img className='CoinImage' src={element.image} style={CoinImage} onClick={() => CoinClick(element)} 
                            height="80px" width='80px'/>
                            <div className='CoinName' style={CoinName} onClick={() => CoinClick(element)}>{element.name}</div>
                    
                        </div>
                        
                        {/* CoinMarket cap rank  */}
                    
                        <div className='CoinRank' style={CoinRank}>{element.market_cap_rank}</div>
                    
                        {/* Coin Price  */}
                    
                        <div className='CoinPrice' style={CoinPrice}>${IndianNumberFormat.format(element.current_price)}</div>
                        
                        {/* 24hour max price   */}
                    
                        <div className='24High' style={CoinHigh}>${IndianNumberFormat.format(element.high_24h)}</div>  
                    
                        {/* 24Hour low price  */}
                    
                        <div className='25Low' style={CoinLow}>${IndianNumberFormat.format(element.low_24h)}</div>
                    
                        {/* Market cap value  */}
                    
                        <div className='MarketCap' style={MarketCap}>${IndianNumberFormat.format(element.market_cap)}</div>     
                    
                    </div>
                )  
            })} 

        </div>
          
        {/* CoinList load Next and Previous Button  */}

        <div className='NextPreviousButton' style={npButton}>

            <button type="button" className="btn btn-primary btn-sm" onClick={PerviousButton}>Previous</button>
            <button type="button" className="btn btn-primary btn-sm" style={Button} onClick={NextButton}>Next</button>

        </div>

        {/* ExchangeList show Division  */}

        <div className='Exchange' style={exchangeList}>
           
           {/* ExchangeList Title Division  */}

            <div className='ExchangeTitleRow' style={ParticularCoin_title}>

                <div className='ExchangeIndex' style={CoinIndex_title}>#</div>
                
                <div className='ExchangeName' style={ExchangeNameTitle}>Exchange name</div>
                
                <div className='ExchangeWebsite' style={WebsiteTitle}>Website</div>
                
                <div className='ExchangeRank' style={CoinRank_title}>Rank</div>
                
                <div className='ExchangeBTCvolume' style={CoinHigh_title}>24H BTC volume</div>

            </div>

            {exchangeData.length != 0 ? 
            exchangeData.map((element) => {

                ExchangeStartIndex ++ ; 
                let IndianNumberFormat = Intl.NumberFormat("en-In") ; 

                return(
                    
                    // Particular ExchangeInformation Division 

                    <div className='ExchangeDiv' style={ExchangeCoinDiv} onMouseOver={HoverEffect}
                    onMouseOut={HoverRemove}>

                        {/* ExchangeList Index  */}

                        <div className='ExchangeIndex' style={CoinIndex}>{ExchangeStartIndex}</div>
                        
                        {/* ExchangeName and ExchangeImage  */}

                        <div className='ExchangeIImageName' style={CoinImageName}>
                            <img className='ExchangeImage' style={CoinImage} src={element.image}></img>
                            <div className='ExchangeName' style={CoinName}>{element.name}</div>
                        </div>

                        {/* Exchange website  */}
                        
                        <div className='ExchangeWebsite' style={WebsiteData}>
                            <i class="fa-solid fa-link fa-2x" onClick={() => openExchangeWebsite(element.url)}></i>
                        </div>

                        {/* Exchange Rank  */}
                        
                        <div className='ExchangeRank' style={CoinRank}>{element.trust_score_rank}</div>
                        
                        {/* Exchange 24H BTC volume Information  */}

                        <div className='ExchangeBTCvolume' style={MarketCap}>${IndianNumberFormat.format(element.trade_volume_24h_btc)}</div>
                    
                    </div>

                )
            }):<></>}

        </div>

        
            
    </div>

    </div>
     
     
  )

}
