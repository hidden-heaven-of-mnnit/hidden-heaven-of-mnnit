import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./TreasureLogin.css";
import googleLogo from "../assets/google.png"; 
import { Toaster, toast } from "react-hot-toast"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeInSession } from "../../../backend/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../assets/firebase";

const TreasureLogin = () => {
  const [action, setAction] = useState("login");
  const [previousAction, setPreviousAction] = useState("login");
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useContext(UserContext);

  const handleClick = (e, actionType) => {
    if (actionType !== previousAction) {
      setPreviousAction(actionType);
      setAction(actionType);
    } else {
      handleSubmit(e, actionType);
    }
  };

  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post("http://localhost:3000" + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user",JSON.stringify(data))
        setUserAuth(data)
        navigate("/HomePage");
      })
      .catch(({ response }) => {
        console.log(response)
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e, actionType) => {
    e.preventDefault();
    let serverRoute = (actionType === "signup") ? "/signup" : "/login"; 
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let form=new FormData(formElement);
    let formData={};
    for(let [key,value] of form.entries()){
        formData[key]=value;
    }
    let {name,email,password}=formData;
    if(actionType=="signup"){
      if(!name) {
        toast.error("Enter name");
        return;
      }
    }
    if(!email.length){
        return toast.error("Enter email");
    }
    if(!emailRegex.test(email)){
        return toast.error("Invalid email format");
    }
    if(!password){
        return toast.error("Enter password");   
    } 
    userAuthThroughServer(serverRoute,formData);
  };
  const handleGoogleAuth=(e)=>{
      e.preventDefault();
      authWithGoogle()
      .then(user=>{
        let serverRoute="/google-auth"
        let formData={
          access_token:user.accessToken 
        }
        userAuthThroughServer(serverRoute,formData)
      })
      .catch(err=>{
        toast.error("Some error occured")
      })
  }
  return (
    <>
      <div className="outerBox">
        <div className="treasure-container">
        <div className="map">
          <h1 className="project-name">Hidden Heaven Of MNNIT</h1>
        </div>
          <div className="login-box">
            <h1 className="treasure-title">Welcome, Adventurer!</h1>
            <p className="treasure-subtitle">Unlock the treasure with your credentials</p>
            <Toaster />
            <form id="formElement"> 
              {action === "signup" && <input type="text" name="name" placeholder="Name" className="input-field" />}
              <input type="email" name="email" placeholder="Email" className="input-field" />
              <input type="password" name="password" placeholder="Password" className="input-field" />
              {action === "signup" && <input type="file" id="profile-image" className="input-field"/>}
              {action === "login" && (
                <div className="forgot-pass">
                  <p>Lost Password? <span>Click here!</span></p>
                </div>
              )}
              <br /><br />
              <div className="input_button">
                <Link to="/login">
                  <button
                    className={action === "login" ? "submit" : "gray submit"}
                    onClick={(e) => handleClick(e, "login")}>
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className={action === "signup" ? "submit" : "gray submit"}
                    onClick={(e) => handleClick(e, "signup")}>
                    Sign Up
                  </button>
                </Link>
              </div>
              <button className="google-button" onClick={handleGoogleAuth}>
                <img src={googleLogo} alt="Google" className="google-icon" />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreasureLogin; 
