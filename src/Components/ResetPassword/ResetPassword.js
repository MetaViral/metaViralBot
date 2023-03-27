import React, { useEffect, userr, useState } from "react";
import "./AuthForm.css"
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signInWithPopup, confirmPasswordReset } from "firebase/auth";
import app from "../../firebase.init";


const ResetPassword = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();
  const [oobCode, setoobCode] = useState();

  useEffect(() => {
    const search = location.search;
    const oobcode = new URLSearchParams(search).get("oobCode");
    if (!oobcode) {
      onAuthStateChanged(auth, async (user) => {
        if (user && user.uid) {
          (navigate('/'))
          await toast.success("You are already logged in", { id: 'ok' })
        }
        else {
          (navigate('/login'))
        }
      });
    }
    else {
      setoobCode(oobcode)
    }
  }, []);



  const handleFormResetPass = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    
    confirmPasswordReset(auth, oobCode, password)
      .then(() => {
        // Signed in 
        toast.success("Password resets successfully", { id: 'ok' })
        navigate('/login')

      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, { id: 'error' })

        console.log(errorMessage);
      });
  }
  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Reset Your Password</h1>
        <form onSubmit={handleFormResetPass}>

          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <button type='submit' className='auth-form-submit'>
            Reset Password
          </button>
        </form>
        <p className='redirect'>

          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;
