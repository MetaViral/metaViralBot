import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebase.init";
const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  useEffect( () => {
    onAuthStateChanged(auth,async (user) => {
    if (!user) {
     navigate('/login')
    } 
  });
}, [])
  return (
    <div style={{ margin: "auto" }}>
      <iframe src="https://chat.metaviralbot.com/" width="100%" height="800px" style={{border:"none"}}></iframe>
    </div>

  );
};

export default Home;
