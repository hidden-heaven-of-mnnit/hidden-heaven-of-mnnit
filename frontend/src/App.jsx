import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import TreasureLogin from './components/TreasureLogin';
import Error from './components/Error';
import HomePage from './components/HomePage'
function App() {
  return (
    <GoogleOAuthProvider clientId="395344652006-jjrv3avri7o3qhlrupudfvhmr5hegfj4.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<TreasureLogin />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<TreasureLogin />} />
        <Route path="/signup" element={<TreasureLogin />} />
        <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
