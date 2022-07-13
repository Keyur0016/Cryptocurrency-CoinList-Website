import React from 'react' ; 


export default function Signup() {
    
    // --- Signup element css --- // 

    const Signup = {
        width: '100vw', 
        height: '86vh', 
        paddingTop: '13vh', 
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center'
    }

    const SignupDiv = {
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


    // 2. Signup Button Function

    const SignupFunction = async () =>{

        let Username = document.getElementById("Email").value ; 
        let Password = document.getElementById("Password").value ; 
        let RePassword = document.getElementById("RePassword").value ; 
        
        if (Username == ""){
            alert("Please, Enter Emailaddress") ; 
        }

        else if (Password == ""){
            alert("Please, Enter Password"); 
        }

        else if (RePassword == ""){
            alert("Please, Enter Confirm password") ; 
        }

        else if (Password != RePassword){
            alert("Password not matching"); 
        }
        
        else{
           
            // Request --> Create new user
            
            const NewUserRequest_url = 'http://localhost:5000/user/new_user' ; 
            const NewUserRequest_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"Username":Username,
            'Password':Password}) 
            }

            const NewUser_request = await fetch(NewUserRequest_url, NewUserRequest_option) ; 
            const NewUser_request_response = await NewUser_request.json() ; 

            if (NewUser_request_response.Status == "Find user"){
                alert("This Username already register"); 
            }
            
            else if (NewUser_request_response.Status == "Create user successfully"){
                 
                // Set Username Cookie for 5 days 
                setCookie("username", Username, 5) ; 

                window.location.href = '/?page=1'; 
            }
            
            else{
                alert(NewUser_request_response.Status); 
            }
        }
    }

    return (
    <div className='Signup' style={Signup}>
        
        {/* Signup Division  */}

        <div className='SigupDiv' style={SignupDiv}>

            <h5 className="card-title">Signup</h5>
            
            {/* InputDivision  */}

            <div className='InputDiv' style={InputDiv}>
                
                {/* 1. Username  */}

                <div className="input-group input-group-sm mb-3">

                    <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                    id='Email'/>

                </div>

                {/* 2. Password  */}
                
                <div className="input-group input-group-sm mb-3">

                    <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                    <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                    id='Password'/>

                </div>

                {/* 3. Cofirm Password  */}

                <div className="input-group input-group-sm mb-3">

                    <span className="input-group-text" id="inputGroup-sizing-sm">Confirm Password</span>
                    <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                    id='RePassword'/>
                    
                </div>

            </div>

            {/* Signup Button  */}

            <button type="button" className="btn btn-warning btn-sm" onClick={SignupFunction}>Signup</button>

        </div>  
    
    </div>
  )
}
