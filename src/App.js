import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home  from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase.js"
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51L82r9HuFTJR44r2LViBx3N00O9pKycv36LQKSGgKfqlZPpp4AXvOMSXlA6zLEpGJXuHPCr1Of7oVWBUhcVKfFoR00SJkM7lXd'
);


function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
      //will only run once when the app component loads...

      auth.onAuthStateChanged(authUser => {
        console.log('THE USER IS >>>',authUser);

        if (authUser) {
          //the user just logged in / the user was logged in
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          // the user is logged out
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
  }, [])


  return (
    //BEM conevtion (look it up)
    <Router>
       <div className="app">
         <Routes>
           <Route path="/" element={[<Header/>,<Home/>]}/>
           <Route path="/checkout" element={[<Header/>,<Checkout/>]}/>
           <Route path="/login" element={[<Login/>]}/>
           <Route path="/payment" element={[<Header/>,<Elements stripe={promise}><Payment/></Elements>]}/>
       </Routes>
      </div>
    </Router>
  );
}

export default App;
