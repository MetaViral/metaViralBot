import React, { useEffect } from "react";
import GoogleLogo from "../../Assets/Image/google.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase.init";
import "./AuthForm.css"

const ForgotPassword = () => {
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


  const handleFormForgotPass = (event) => {
    event.preventDefault();

    const email = event.target.email.value;


    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Signed in 
        
       
        toast.success("Email send successfully", { id: 'ok' })
        navigate('/login')
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Email is invalid", { id: 'error' })
        // if (errorMessage.includes("Error (auth/wrong-password)")) {
        //   toast.error("Email or password is wrong", { id: 'error' })
        // }
        // else if (errorMessage.includes("Error (auth/user-not-found)")) {
        //   toast.error("User not found", { id: 'error' })
        // }

        console.log(errorMessage);
      });
  }
  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>ForgotPassword</h1>
        <form onSubmit={handleFormForgotPass}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='text' name='email' id='email' />
            </div>
          </div>
         
          <button type='submit' className='auth-form-submit'>
            Send Reset Email
          </button>
        </form>
        <p className='redirect'>
          
          <span onClick={() => navigate("/login")}>Back to Login</span>
        </p>
        
        
      </div>
    </div>
  );
};

export default ForgotPassword;
