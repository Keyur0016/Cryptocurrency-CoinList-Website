import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Signup from './Component/Signup/Signup';
import Signin from './Component/Signin/Signin' ; 
import CoinList from './Component/CoinList/Coinlist' ; 
import CoinInfo from './Component/CoinInfo_css/CoinInfo' ; 
import Protfolio from './Component/Protfolio/Protfolio' ; 
import {
  BrowserRouter ,
  Routes,
  Route
} from "react-router-dom";


function App() {
  
  return (
    <>
    <BrowserRouter>

      <Navbar/>
        <Routes>
           
          <Route path='/' element={<CoinList/>} />
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Signin' element={<Signin/>}/>
          <Route path='/CoinInfo' element={<CoinInfo/>}/>
          <Route path='/Protfolio' element={<Protfolio/>}/>

        </Routes>

    </BrowserRouter>
    </>
  );

}

export default App;
