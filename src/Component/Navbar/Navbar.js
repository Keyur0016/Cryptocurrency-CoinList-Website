import React from 'react' ; 
import {Link, useLocation} from 'react-router-dom' ; 

export default function Navbar() {

    // --- current, Location path --- // 
    
    const location = useLocation() ; 

    // --- Navbar element css widget --- // 

    const Navbar = {
        backgroundColor : '#08071b',
        height: '9vh',
        width: '100vw',
        display: 'flex',
        textAlign: 'center',
        justifyConten: 'center',
        position: 'fixed'
    }
   
    const NavbarTitle = {
        color: 'white',
        fontSize: '0.90rem',
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '0.40rem',
        cursor: 'pointer',
        textDecoration: 'none'
    }

    const Signup = {
        color: '#eaeaea',
        fontSize: '0.80rem',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '1.1rem',
        cursor: 'pointer',
        textDecoration: 'none'
    }

    // 1. Signup, Signin Hover and RemoveHover Effect Function 

    const Hover = (event) => {
        event.target.style.color = "white"; 
    }
    
    const RemoveHover = (event) => {
        event.target.style.color = '#eaeaea' ; 
    }

    return (
    <div className='Navbar' style={Navbar}>

       <Link className='NavbarTitle' style={NavbarTitle} to="/?page=1">Coinlist</Link>
        
        {/* Signup option  */}
          
        {((location.pathname != '/CoinList') && (location.pathname != '/CoinInfo') && (location.pathname != '/Protfolio')) ? <Link className='Signup_option' style={Signup} onMouseEnter={Hover} onMouseLeave={RemoveHover} to='/Signup' >
            Signup</Link> : <></>}

        {/* Signin option  */}
         
        {((location.pathname != '/CoinList') && (location.pathname != '/CoinInfo') && (location.pathname != '/Protfolio'))?<Link className='Signin_option' style={Signup} onMouseEnter={Hover} onMouseLeave={RemoveHover} to="/Signin">
            Signin</Link>:<></> }    
    
    </div>
  )
}
