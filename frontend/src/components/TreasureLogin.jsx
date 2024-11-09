import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
  const [selectedFileName, setSelectedFileName] = useState("");  // State to store the file name
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
        storeInSession("user", JSON.stringify(data))
        setUserAuth(data)
        navigate("/HomePage");
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e, actionType) => {
    e.preventDefault();
    let serverRoute = actionType === "signup" ? "/signup" : "/login"; 
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
        formData[key] = value;
    }
    let { name, email, password } = formData;
    if (actionType === "signup" && !name) return toast.error("Enter name");
    if (!email) return toast.error("Enter email");
    if (!emailRegex.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Enter password");   
    userAuthThroughServer(serverRoute, formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : "");  // Set the file name when a file is selected
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authWithGoogle()
      .then(user => {
        let serverRoute = "/google-auth";
        let formData = { access_token: user.accessToken };
        userAuthThroughServer(serverRoute, formData);
      })
      .catch(() => {
        toast.error("Some error occurred");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1608924066819-930edc42986a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <h1 className="text-yellow-500 font-bold text-2xl lg:text-4xl mb-4 text-center">Hidden Heaven Of MNNIT</h1>
          
          <div className="flex flex-col items-center bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl lg:text-5xl font-semibold text-center mb-2">Welcome, Adventurer!</h1>
            <p className="text-lg lg:text-2xl text-gray-300 mb-6 text-center">Unlock the treasure with your credentials</p>
            <Toaster />

            <form id="formElement"> 
              {action === "signup" && (
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 mb-4" 
                />
              )}
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 mb-4" 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 mb-4" 
              />
              {action === "signup" && (
                <div className="w-full p-3 bg-gray-700 text-white rounded-lg cursor-pointer mb-4">
                  <label className="w-full text-center text-gray-400 cursor-pointer hover:bg-gray-600 focus:ring-2 focus:ring-yellow-500">
                    Choose your profile pic
                    <input 
                      type="file" 
                      id="profile-image" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </label>
                  {selectedFileName && (
                    <p className="text-gray-300 text-sm mt-2 text-center">{selectedFileName}</p>
                  )}
                </div>
              )}

              {action === "login" && (
                <div className="text-sm text-gray-400">
                  <p>Lost Password? <span className="text-blue-400 cursor-pointer">Click here!</span></p>
                </div>
              )}
              <div className="flex gap-4 justify-center mt-4">
                <Link to="/login">
                  <button
                    className={`py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 ${action === "login" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-500 text-white hover:bg-gray-600"}`}
                    onClick={(e) => handleClick(e, "login")}>
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className={`py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 ${action === "signup" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-500 text-white hover:bg-gray-600"}`}
                    onClick={(e) => handleClick(e, "signup")}>
                    Sign Up
                  </button>
                </Link>
              </div>
              
              <button className="w-full mt-4 flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer focus:outline-none" onClick={handleGoogleAuth}>
                <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
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
