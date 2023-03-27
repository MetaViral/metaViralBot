import React, { useEffect } from "react";
import "./AuthForm.css";
import GoogleLogo from "../../Assets/Image/google.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "../../firebase.init";


const Login = () => {
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
  const googleProvider = new GoogleAuthProvider();
  const googleAuth = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user
        navigate('/chatbot');
        toast.success("You are logged in", { id: 'ok' })
      }).catch((error) => {
        const errorMessage = error.message;
      });
  }

  const handleFormLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/chatbot')
        toast.success("You are logged in", { id: 'ok' })
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("Error (auth/wrong-password)")) {
          toast.error("Email or password is wrong", { id: 'error' })
        }
        else if (errorMessage.includes("Error (auth/user-not-found)")) {
          toast.error("User not found", { id: 'error' })
        }

        console.log(errorMessage);
      });
  }
  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Login</h1>
        <form onSubmit={handleFormLogin}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='text' name='email' id='email' />
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <p className='redirect pull-right'>
            <span onClick={() => navigate("/forgotpassword")}>Forgot Password?</span>
          </p>
          <button type='submit' className='auth-form-submit'>
            Login
          </button>
        </form>
        <p className='redirect'>
          New User?{" "}
          <span onClick={() => navigate("/signup")}>Create New Account</span>
        </p>

        {/* <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div> */}
        {/* <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
