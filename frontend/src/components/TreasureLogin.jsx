import React, { useState } from "react";
import "./TreasureLogin.css";

const TreasureLogin = () => {
  let [Action, SetAction] = useState("login")

  return (
    <>
      <div className="outerBox">
        <div className="map">
          <h1 className="project-name"> Hidden <br />  Heaven <br /> Of <br /> MNNIT </h1>
        </div>
        <div className="treasure-container">
          <div className="login-box">
            <h1 className="treasure-title">Welcome, Adventurer!</h1>
            <p className="treasure-subtitle">Unlock the treasure with your credentials</p>
            {Action === "signup" ? <div></div> : <input type="text" placeholder="name" className="input-field" />} 
            <input type="mail" placeholder="email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            {Action === "signup" ? <div></div> : <input type="file" id="profile-image"  className="input-field"/>}
            {Action === "login" ? <div></div> : <div className="forgot-pass"><p>Lost Password?<span>Click here!</span> </p></div>}
            <br /> <br /> 
            <div className="input_button">
              <button className={Action === "login" ? "gray submit" : "submit"} onClick={()=>{SetAction("signup")}}>Login</button>
              <button className={Action === "signup" ? "gray submit" : "submit"} onClick={()=>{SetAction("login")}}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreasureLogin;
