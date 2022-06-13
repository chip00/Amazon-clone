import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import './Login.css';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const singIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user wih email
                // and password
                console.log(auth);
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
        // do some fancy firebase register shiiit
    }
  return (
    <div className='login'>
        <Link to='/'>
             <img 
                className='login__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'

        />
        </Link>

        <div className='login__container'>
            <h1>Sign in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email}
                onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value={password}
                onChange={e => setPassword(e.target.value)}/>

                <button type='submit' onClick={singIn} 
                className='login__singInButton'>Sing In 
                </button>

               
            </form>

            <p>
                     By signing-in you agree to the AMAZON FAKE CLONE
                     Conditions of Use & Sale. Please
                     see our Privacy Notice, our Cookies
                     Notice and our Interest-Based Ads Notice.
            </p>

                <button onClick={register}
                 className='login_registerButton'>
                    Create your Amazon Account</button>

        </div>
    </div>
  )
}

export default Login