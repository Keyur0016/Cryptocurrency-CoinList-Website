import React, { useEffect, useState } from 'react' ;

// import css related variable 

import { CoinInformationDiv, RankInformation, CoinNameImage, CoinImage, CoinName } from './CoinInfoCss';
import { MarketCapInformationDiv, MarketInformationTitle, MarketDataDivision, MarketData_title, MarketData } from './CoinInfoCss';
import { AboutCoinInformation, LinkImage, LinkDivision, Link } from './CoinInfoCss';

export default function CoinInformation() {
  
  // Function -> Get Username cookie value

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
  
  const Username = getCookie("username") ; 

  // Get click coin name element data by sessionStorage 

  var CoinData = sessionStorage.getItem("element") ; 
  CoinData = JSON.parse(CoinData) ; 

  // Get coinName data by sessionStorage 
  
  const CoinNameSession = JSON.parse(sessionStorage.getItem("coinname")) ; 

  // Pricechange Formate

  let PriceChangeFormate = Intl.NumberFormat("en-In"); 

  var CoinChange = CoinData.price_change_percentage_24 ; 

  // useState => Store coinInformation data 

  const [coinInfo, coinInfoUpdate] = useState({}) ; 

  const FetchCoinInfo = async () => {

    const CoinInformationURL = `https://coingecko.p.rapidapi.com/coins/${CoinData.id}?localization=false&market_data=false&community_data=true&developer_data=true&sparkline=false`;
    const CoinInfoRequest_Option = {
      methdod : 'GET',
      headers: {
        'X-RapidAPI-Key': 'fb786a2467msh65e01f24ab4e61ap17010ajsnbabe3670301a',
        'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
      }
    }

    const CoinInfo_request = await fetch(CoinInformationURL, CoinInfoRequest_Option); 
    const CoinInfo_request_response = await CoinInfo_request.json() ; 
    coinInfoUpdate(CoinInfo_request_response) ;

  } ; 
  
  useEffect( () => {

    FetchCoinInfo() ; 
  
  }) ; 

  // Function => Social handle icon HoverEffect

  const Hover = (event) => {
    event.target.style.color = '#464646'; 
  }


  // Function => Social handle icon RemoveHoverEffect 

  const RemoveHover = (event) => {
    event.target.style.color = '#919191' ; 
  }

  // CSS State - Store SaveOption css

  const SaveOption = {
    width: '100%',
    justifyContent: 'left',
    textAlign: 'left', 
    paddingTop: '0.60rem',
    paddingLeft: '1.60rem',
    marginBottom: '1.50rem'
  }

  const [saveoption , saveoptionUpdate] = useState(SaveOption) ; 

  // Function => SaveCoinData to Database

  const SaveCoinData = async () => {
    const saveURL = 'http://localhost:5000/coin/save';
    const saveRequestOption = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body : JSON.stringify({"Username":Username,
      "Name": CoinData.name,
      "Image": CoinData.image,
      "Cap": CoinData.market_cap,
      "Rank": CoinData.market_cap_rank,
      "Id" : CoinData.id})
    }

    const coinSave_request = await fetch(saveURL, saveRequestOption) ; 
    const coinSave_request_response = await coinSave_request.json() ; 
    CoinNameSession.push(CoinData.name) ; 
    
    saveoptionUpdate({
      "display": 'none'
    }) ; 

    sessionStorage.setItem("coinname", JSON.stringify(CoinNameSession)) ; 

  }
   
  // --- CoinInformation element widget css --- // 

  const PriceChange = {
    fontSize : '1rem', 
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '0.65rem',
    color: `${CoinChange < 0 ? '#fc0000' : '#07dd00'}`
  } ; 
  
  const SpinnerDivCSS = {
    display : 'none',
    marginTop: '1.5rem',
    marginBottom: '1.2rem',
    height: '2.5rem'
  }

  const coinInformation = {
    fontSize: '0.92rem'
  }

  const [spinnerDiv, spinnerDivUpdate] = useState(SpinnerDivCSS) ; 
   
  // var -> For chart URL 

  let ChartURL = "https://www.tradingview.com/symbols/" + CoinData.symbol.toUpperCase() + "USDT/?exchange=BINANCE" ; 
  
  // -- Set Coin other data  --- // 
 
  if (coinInfo != {}){
    try {
      
      document.getElementById("CoinInformation").innerHTML = coinInfo.description.en ; 
      document.getElementById("Redditsub").innerText = PriceChangeFormate.format(coinInfo.community_data.reddit_subscribers) ;
      document.getElementById("Twittersub").innerText = PriceChangeFormate.format(coinInfo.community_data.twitter_followers) ; 
      document.getElementById("Redditpost").innerText = PriceChangeFormate.format(coinInfo.community_data.reddit_average_posts_48h) ; 
      document.getElementById("Redditcomment").innerText = PriceChangeFormate.format(coinInfo.community_data.reddit_average_comments_48h) ; 
      document.getElementById("Redditactive").innerText = PriceChangeFormate.format(coinInfo.community_data.reddit_accounts_active_48h) ;  
      
      document.getElementById("Mineblock").innerText = coinInfo.block_time_in_minutes ; 
      document.getElementById("Hashalgo").innerText = coinInfo.hashing_algorithm ; 
      document.getElementById("Liscore").innerText = coinInfo.liquidity_score ; 
      document.getElementById("Descore").innerText = coinInfo.developer_score; 
      document.getElementById("Pscore").innerText = coinInfo.public_interest_score ; 
      document.getElementById("Priceup").innerText = coinInfo.sentiment_votes_up_percentage ; 
      document.getElementById("Pricedown").innerText = coinInfo.sentiment_votes_down_percentage ;

      document.getElementById("Home").href = coinInfo.links.homepage[0] ; 
      document.getElementById("Github").href = coinInfo.links.repos_url.github[0] ; 
      document.getElementById("Facebook").href = "https://facebook.com/" + coinInfo.links.facebook_username ; 
      document.getElementById("Twitter").href = "https://twitter.com/" + coinInfo.links.twitter_screen_name ; 
      document.getElementById("Reddit").href = coinInfo.links.subreddit_url ; 
    } 
    catch(error){}
  }

  return (
  
  <div className='CoinInformationDiv' style={CoinInformationDiv}>

      {/* Save to protfolio option  */}
      
      {!CoinNameSession.includes(CoinData.name) ? 
        
        <div className='SaveOption' style={saveoption}>
          <button type="button" class="btn btn-primary btn-sm" onClick={SaveCoinData}>Save to Protfolio</button>
        </div>
      : <></> }
      

      {/* Coin RankInformation */}

      <div className='RankInformation' style={RankInformation}>
        Rank # {CoinData.market_cap_rank}
      </div>

      {/* Coin Image and Coin Name  */}

      <div className='CoinNameImage' style={CoinNameImage}>
         
        {/* CoinImage  */}
        <img className='CoinImage' style={CoinImage} src={CoinData.image}></img>
       
        {/* CoinName  */}
        <div className='CoinName' style={CoinName}>{CoinData.name}</div>
       
        {/* Coin 24Change  */}
        <div className='24Change' style={PriceChange}>{CoinData.price_change_percentage_24h}%</div>

      </div>

      {/* Data loading spinner  */}

      <div class="d-none justify-content-center" style={spinnerDiv}>
        <div class="spinner-border" role="status">
        </div>
      </div>

      {/* Coin information and Other information division  */}

      <div className='AboutCoin_OtherInformation' style={AboutCoinInformation}>
        
        {/* Aboutcoin Information  */}

          <p class="card-text" id='CoinInformation' style={coinInformation}></p>
          
      </div>
       
 
      <div className='MarketInformation' style={MarketCapInformationDiv}>

      {/* Statistics information title  */}
      <div className='MarketInformation_title' style={MarketInformationTitle}>{CoinData.name} Price Statistics</div>
      
      {/* Coin Price information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>{CoinData.name} price</div>
        <div className='MartketData' style={MarketData}>${PriceChangeFormate.format(CoinData.current_price)}</div>

      </div>

      {/* 24High information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>24h High</div>
        <div className='MartketData' style={MarketData}>${PriceChangeFormate.format(CoinData.high_24h)}</div>

      </div>

      {/* 24Low information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>24h Low</div>
        <div className='MartketData' style={MarketData}>${PriceChangeFormate.format(CoinData.low_24h)}</div>

      </div>

      {/* Market cap information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Market cap</div>
        <div className='MartketData' style={MarketData}>${PriceChangeFormate.format(CoinData.market_cap)}</div>

      </div>
       
      {/* 24h change market cap  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>24h Change Market cap</div>
        <div className='MartketData' style={MarketData}>{CoinData.price_change_percentage_24h}</div>

      </div>

      {/* Maximum supply information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Max supply</div>
        <div className='MartketData' style={MarketData}>{CoinData.max_supply == null? 'None': CoinData.max_supply}</div>

      </div>
      
      {/* Total supply information  */}
      
      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Total supply</div>
        <div className='MartketData' style={MarketData}>{CoinData.total_supply}</div>

      </div>

      {/* Total volumn information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Total volume</div>
        <div className='MartketData' style={MarketData}>{CoinData.total_volume}</div>

      </div>

      {/* Statistics information title  */}
      <div className='MarketInformation_title' style={MarketInformationTitle}>{CoinData.name} community data</div>
      
      {/* Reddit subscriber information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Reddit subscriber</div>
        <div className='MartketData' style={MarketData} id="Redditsub"></div>

      </div>

      {/* Twitter follower information Division  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Twitter follower</div>
        <div className='MartketData' style={MarketData} id="Twittersub" ></div>

      </div>

      {/* Reddit 48h average post information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Reddit 48h average post</div>
        <div className='MartketData' style={MarketData} id='Redditpost' ></div>

      </div>

      {/* Reddit 48h average comment information */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Reddit 48h average comment</div>
        <div className='MartketData' style={MarketData} id="Redditcomment" ></div>

      </div>
       
      {/* Reddit account 48h active information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Reddit account 48h active</div>
        <div className='MartketData' style={MarketData} id="Redditactive" ></div>

      </div>
       
      {/* Statistics information title  */}
      <div className='MarketInformation_title' style={MarketInformationTitle}>{CoinData.name} other data</div>
      
      {/* Block mine information division  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Block mine time</div>
        <div className='MartketData' style={MarketData} id="Mineblock"></div>

      </div>

      {/* Hashing algorithm information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Hashing algorithm</div>
        <div className='MartketData' style={MarketData} id="Hashalgo"></div>

      </div>

      {/* Liquidity score information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Liquedity score</div>
        <div className='MartketData' style={MarketData} id="Liscore"></div>

      </div>

      {/* Developer score  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Developer score</div>
        <div className='MartketData' style={MarketData} id="Descore"></div>

      </div>
     
      {/* Public interest score  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>Public interest score</div>
        <div className='MartketData' style={MarketData} id="Pscore"></div>

      </div>

      {/* Upvote information  */}
      
      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>PriceUp percentage</div>
        <div className='MartketData' style={MarketData} id="Priceup"></div>

      </div>
      
      {/* Downvote information  */}

      <div className='MarketDataDivision' style={MarketDataDivision}>

        <div className='MarketData_title' style={MarketData_title}>PriceDown percentage</div>
        <div className='MartketData' style={MarketData} id="Pricedown"></div>

      </div>
      
      {/* Social handle title  */}
      <div className='MarketInformation_title' style={MarketInformationTitle}>{CoinData.name} social handle</div>

      <div className='LinkDiv' style={LinkDivision}>
        
        {/* Particular coin site  */}

        <div style={LinkImage}>
          
          <a href='' id="Home" target="_blank" >
            <i class="fa-solid fa-link fa-2x" style={Link} onMouseEnter={Hover} onMouseLeave={RemoveHover}></i>
          </a>
        
        </div>

        {/* Github page information  */}

        <div style={LinkImage}>
          
          <a href='' id='Github' target="_blabk" >
            <i class="fa-brands fa-github fa-2x" style={Link} onMouseEnter={Hover} onMouseLeave={RemoveHover}></i>
          </a>
        
        </div>
         
        {/* Facebook page information  */}

        <div style={LinkImage}>
          
          <a href='' id='Facebook' target="_blank">
            <i class="fa-brands fa-facebook fa-2x" style={Link} onMouseEnter={Hover} onMouseLeave={RemoveHover} ></i>
          </a>

        </div>     

        {/* Twitter page information  */}

        <div style={LinkImage}>
          
          <a href='' id='Twitter' target="_blank">
            <i class="fa-brands fa-twitter fa-2x" style={Link} onMouseEnter={Hover} onMouseLeave={RemoveHover}></i>
          </a>

        </div>   

        {/* Reddit page information    */}

        <div style={LinkImage}>
          
          <a href='' id='Reddit' target="_blank">
            <i class="fa-brands fa-reddit fa-2x" style={Link} onMouseEnter={Hover} onMouseLeave={RemoveHover}></i>
          </a>
        
        </div>     
   
      </div>
     
      </div> 

      <div class="tradingview-widget-container">

        <div class="tradingview-widget-copyright">
          
          <a href={ChartURL} rel="noopener" target="_blank"
          style={{"textDecoration": "none"}}>
          <span class="blue-text">{CoinData.symbol.toUpperCase()}USDT Chart</span></a> by TradingView
        
        </div>
        
      </div>
  
  </div>

  )
}
