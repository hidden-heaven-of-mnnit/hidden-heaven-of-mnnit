import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import TreasureLogin from './components/TreasureLogin';
import Error from './components/Error';
import HomePage from './components/HomePage';
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "../../backend/session";

export const UserContext=createContext({})
function App() {
  const [userAuth, setUserAuth] = useState({ access_token: null });
  useEffect(()=>{
    let userInSession=lookInSession("user");
    userInSession?setUserAuth(JSON.parse(userInSession)):setUserAuth({access_token:null})
    
  },[])
  return (
    <UserContext.Provider value={{userAuth,setUserAuth}}>
    <GoogleOAuthProvider clientId="395344652006-jjrv3avri7o3qhlrupudfvhmr5hegfj4.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<TreasureLogin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<TreasureLogin />} />
        <Route path="/signup" element={<TreasureLogin />} />
        <Route path="/google-auth" element={<TreasureLogin />} />
        <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </UserContext.Provider>
  );
}

export default App;
