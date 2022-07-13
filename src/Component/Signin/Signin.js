import React from 'react'; 

export default function Verification() {

   // --- Signin element widget css --- // 

    const Signin = {
        width: '100vw', 
        height: '86vh', 
        paddingTop: '13vh', 
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center'
    }

    const SigninDiv = {
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 'fit-content',
        width: '38vw',
        textAlign: 'center',
        justifyContent: 'center'
    }

    const InputDiv = {
        marginTop: '2rem',
        marginBottom: '2rem'
    }
     
    // 1. SetCookie Function 

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // 2. Signin Function 

    const SigninFunction = async () =>{

        let LoginUsername = document.getElementById("Email").value ; 
        let LoginPassword = document.getElementById("Password").value ; 

        if  (LoginUsername == ""){
            alert("Please, Enter Username");
        }

        else if (LoginPassword == ""){
            alert("Please, Enter Password");
        }
        
        else{

            // Request -> Login User Check 

            const LoginRequestURL = 'http://localhost:5000/user/login_user' ;
            const LoginRequestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"Username":LoginUsername,
                                    "Password":LoginPassword})
            }; 

            const Login_request = await fetch(LoginRequestURL, LoginRequestOption); 
            const Login_request_response = await Login_request.json() ; 
            
            if (Login_request_response.Status == "Invaild Password"){
                alert("Please, Enter correct password") ; 
            }

            else if (Login_request_response.Status == 'This emailaddress is not register'){
                alert("This emailaddress not register with any account"); 
            }

            else if (Login_request_response.Status == "Match Password"){
                
                // setCookie of Username 
                setCookie("username", LoginUsername) ; 

                window.location.href = '/?page=1' ; 
            }

            else{
                alert(Login_request_response.Status) ; 
            }
        }
    }
    
    return (
        <div className='Verification' style={Signin}>
           
            <div className='VerificationDiv' style={SigninDiv}>

            <h5 className="card-title">Sigin</h5>

                <div className='InputDiv' style={InputDiv}>
                      
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        id='Email'/>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                        <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                        id='Password'/>
                    </div>

                </div>
                
                <button type="button" className="btn btn-warning btn-sm" onClick={SigninFunction}>Signin</button>

            </div>
        
        </div>
    )
}
