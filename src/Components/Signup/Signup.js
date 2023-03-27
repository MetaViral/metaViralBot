import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import facebook from "../../Assets/Image/facebook.png"

import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup ,onAuthStateChanged} from "firebase/auth";
import app from "../../firebase.init";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Signup = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user && user.uid) {
           (navigate('/'))
          await toast.success("You are already logged in", { id: 'ok' })
        }
      });
    };
  
    checkUser();
  }, []);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState('');

  // console.log(email, password, confirmPassword)
  const facebookAuth = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        navigate('/chatbot')
        toast.success("You are logged in", { id: 'ok' })
        console.log(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("auth/account-exists-with-different-credential")) {
          toast.error("The account already exists  with different provider.", { id: 'error' })
        }

      });
  }
  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        navigate("/chatbot")
        toast.success("You are logged in", { id: 'ok' })
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }

  const handleEmail = (emailInput) => {
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: '' })
    } else {
      setEmail({ value: '', error: 'Invalid email' })
    }

  }
  const handlePassword = (passwordInput) => {
    setPassword(passwordInput)
  }
  const handleConfirmPassword = (conPasswordInput) => {
    setConfirmPassword(conPasswordInput)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password are not matched", { id: 'error' })
    } else {
      const email = (event.target.email.value);
      const password = (event.target.password.value);


      // const confirmPassword = (event.target.confirmPassword.value);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate('/chatbot')
          toast.success("User created!", { id: 'ok' })

        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage.includes("email-already-in-use")) {

            toast.error("User already exist!", { id: 'error' })
          } else {
            toast.error(errorMessage, { id: 'error' })
          }
        });
    }
  }

  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='email' name='email' id='email' onBlur={(event) => handleEmail(event.target.value)} />
            </div>
            {
              email?.error && <p>{email.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' onBlur={(event) => handlePassword(event.target.value)} />
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <div className='input-wrapper'>
              <input
                type='password'
                name='confirmPassword'
                id='confirm-password'
                onBlur={(event) => handleConfirmPassword(event.target.value)}
              />
            </div>
          </div>


          <input type='checkbox' required/>
          <span style={{marginLeft:"8px",fontSize:"14px"}}>I accept to <a href="/terms">terms and conditions</a></span>

 
          <button type='submit' className='auth-form-submit'>
            Sign Up
          </button>
        </form>
        <p className='redirect'>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        {/* <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
        <div className='input-wrapper mt'>
          <button className='google-auth' onClick={facebookAuth}>
            <img className="fb-img" src={facebook} alt='' />
            <p> Continue with Facebook </p>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
