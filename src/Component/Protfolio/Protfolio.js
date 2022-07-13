import React from 'react' ; 
import { useEffect, useState } from 'react';

export default function Protfolio() {
    
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

    // Function -> SetCookie function 

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    // useState -> Store user save cryptocurrency information
    
    const [savecoinData, savecoinDataUpdate] = useState([]) ; 

    // Function -> Fetach all user save coinData 

    const FetchAllCoin = async () =>{
        
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
        
        savecoinDataUpdate(GetCoin_request_response.Status) ; 
    }

    // useEffect hook 

    useEffect(() => {
        FetchAllCoin() ; 
    }) 

    // Function -> For Get Particular coin Data 

    const FetchCoinData = async (elementid) => {
        console.log(elementid) ; 
        const CoinDataURL = `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&price_change_percentage=24h&page=1&sparkline=false&per_page=12&ids=${elementid}&order=market_cap_desc` ; 
        const CoinDataRequestOption = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fb786a2467msh65e01f24ab4e61ap17010ajsnbabe3670301a',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        } ; 

        const CoinData_request = await fetch(CoinDataURL, CoinDataRequestOption) ; 
        const CoinData_request_response = await CoinData_request.json() ; 
        
        sessionStorage.setItem("element", JSON.stringify(CoinData_request_response[0])) ; 

        window.open('/CoinInfo', "_blank") ; 
    }

    // Function -> CoinName HoverEffect 

    const Hover = (element) => {
        element.target.style.color = '#2c2c2c' ; 
    }

    // Function -> CoinName RemoveHover Effect 

    const RemoveHover = (element) => {
        element.target.style.color = '#5e5e5e' ; 
    }

    // Function -> DeleteButton Hover Effect 

    const DeleteHover = (element) => {
        element.target.style.color = '#ff0000' ; 
    }

    // Function -> DeleteButton RemoveHover Effect 

    const DeleteRemoveHover = (element) => {
        element.target.style.color = '#ff5656' ; 
    }

    // Function -> Remove CoinData Function 

    const RemomveCoinData = async (coiname) => {
        const DeleteURL = 'http://localhost:5000/coin/delete' ; 
        const DeleteRequestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({"Username": Username, "Name":coiname}) 
        } ; 

        const DeleteData_request = await fetch(DeleteURL, DeleteRequestOption) ; 
        const DeleteData_request_response = await DeleteData_request.json() ; 

    }

    // Function -> Logout Option function 

    const Logout = () => {
        setCookie("username", "", 30) ; 
        window.location.href = '/'; 
    }

    // --- Protfolio element widget css --- // 

    const MainDivision = {
        height: '87vh',
        width: '100vw',
        paddingTop: '12vh',
        textAlign: 'center',
        justifyContent: 'center'
    }

    const CoinDataTitle = {
        width: '70%',
        height: 'fit-content',
        marginLeft: 'auto', 
        marginRight: 'auto',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'left',
        borderBottom: '1px solid #d7d7d7' ,
        backgroundColor: 'rgb(247,247,247)',
        paddingTop: '0.60rem',
        paddingBottom: '0.60rem'
    }

    const CoinData = {
        width: '70%',
        height: 'fit-content',
        marginLeft: 'auto', 
        marginRight: 'auto',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'left',
        borderBottom: '1px solid #d7d7d7' ,
        paddingTop: '0.60rem',
        paddingBottom: '0.60rem'
    }

    const CoinIndex_title = {
        width: '10%',
        textAlign: 'centert',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }

    const CoinName_title = {
        width: '30%',
        fontSize: '0.75rem',
        fontWeight: 'bold' 
    }

    const CoinDeleteButton_title = {
        width: '20%',
        fontSize: '0.75rem',
        fontWeight: 'bold'
    }

    const CoinDeleteButton = {
        width: '20%',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color : '#ff5656', 
        cursor: 'pointer'
    }

    const CoinImage = {
        height: '90px',
        width: '90px',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
    
    const CoinImageName = {
        width: '30%',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center'
    }

    const CoinIndex = {
        width: '10%',
        textAlign: 'centert',
        fontSize: '0.8rem',
        backgroundColor: 'transparent',
        fontWeight: 'bold'
    }

    const CoinName = {
        width: '30%',
        fontSize: '0.75rem'
    }
    
    const coinName = {
        fontSize: '0.75rem',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '0.40rem',
        fontWeight: 'bold',
        color: '#5e5e5e', 
        cursor: 'pointer'
    }

    const MainTitle = {
        marginTop: '1.2rem',
        marginBottom: '2rem'
    }

    const LogoutDivision = {
        width: '100vw',
        textAlign: 'left',
        justifyContent: 'left', 
        paddingLeft: '0.60rem'
    }

    let startIndex = 0 ; 


    return (
    
    <div className='MainDivision' style={MainDivision}>

        {/* Logout option division  */}
        <div className='LogoutDivision' style={LogoutDivision}>

            <button type="button" class="btn btn-primary btn-sm"
            onClick={Logout}>Logout</button>
        
        </div>
             
        {/* Your cryptocurrency protfolio title  */}

        <h5 class="card-title" style={MainTitle}>Your Cryptocurrency Protfolio </h5>

        <div className='ProifolioCoinData' style={CoinDataTitle}>
    
            <div className='CoinIndex' style={CoinIndex_title}>#</div>
    
            <div className='CoinName' style={CoinName_title}> Coin</div>
      
            <div className='CoinRank' style={CoinIndex_title}>Rank</div>
        
            <div className='CoinMarketCap' style={CoinName_title}>Market cap</div>
            
            <div className='CoinDelete' style={CoinDeleteButton_title}>Delete</div>
        
        </div>
       
        {savecoinData.map((element) => {
              
            startIndex ++ ;
            
            let PriceFormate = Intl.NumberFormat("en-In") ; 


            return(

                <div className='ProtfolioCoinData' style={CoinData} key={element.name}>
                    
                    {/* CoinIndex  */}
                    <div className='CoinIndex' style={CoinIndex} key={startIndex}>{startIndex}</div>
                    
                    {/* CoinImage and CoinName  */}
                    <div className='CoinImageName' style={CoinImageName} onClick={() => {FetchCoinData(element.CoinId)}} 
                    >
                        <img className='CoinImage' style={CoinImage} src={element.CoinImage} onClick={() => {FetchCoinData(element.CoinId)}}></img>
                        <div className='CoinName' style={coinName} onClick={() => {FetchCoinData(element.CoinId)}}
                        onMouseEnter={Hover} onMouseLeave={RemoveHover}>{element.CoinName}</div>
                    </div>
                    
                    {/* CoinRank  */}
                    <div className='CoinRank' style={CoinIndex}>{element.CoinRank}</div>
                    
                    {/* CoinMarketCap  */}
                    <div className='CoinMarketCap' style={CoinName}>${PriceFormate.format(element.CoinMarketCap)}</div>
                    
                    {/* CoinDelete Option  */}
                    <div className='CoinDelete' style={CoinDeleteButton} onMouseEnter={DeleteHover} onMouseLeave={DeleteRemoveHover}
                    onClick={() => RemomveCoinData(element.CoinName)}>Delete</div>
                
                </div>
            )
        })}
    </div>
    )
}
