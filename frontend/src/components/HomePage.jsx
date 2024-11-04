import React from "react";
import "./HomePage.css";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
      <div className="font-sans bg-cover bg-fixed h-screen flex-col justify-center items-center relative"
      style={{
        fontFamily: "'Trebuchet MS', sans-serif",
        backgroundImage: "url('https://images.unsplash.com/photo-1608924066819-930edc42986a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}>
      <NavBar />
      <div className="w-[100%] max-w-full h-[90.5vh] p-5 bg-black bg-opacity-0 rounded-lg shadow-md shadow-black/15 overflow-y-auto mt-0 flex flex-col">

        <div className="login-box">
          <h1 className="treasure-title">Welcome, Adventurer!</h1>
          <p className="treasure-subtitle">Unlock the treasure with your quests</p>
        </div>

        <div className="quests-container">
          {/* Live Public Quest Section (Left) */}
          <div className="live-public-quest">
            <h2>Live Public Quest</h2>
            <div className="quest-list">
              <ul>
                <li className="game-item">
                  Game 1 <button className="join-button">Join</button>
                </li>
                <li className="game-item">
                  Game 2 <button className="join-button">Join</button>
                </li>
                <li className="game-item">
                  Game 3 <button className="join-button">Join</button>
                </li>
                {/* Add more games as needed */}
              </ul>
            </div>
          </div>

          {/* Private Quests Section (Middle) */}
          <div className="private-quests">
            <h2>Private Quests</h2>
            <button className="quest-button">Host</button>
            <button className="quest-button">Join</button>
          </div>

          {/* Past Quests Section (Right) */}
          <div className="past-quests-report">
            <h2>Your Past Quests</h2>
            <div className="quest-list">
              <ul>
                <li className="past-quest-item">
                  Quest 1 - Finished in 30 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                <li className="past-quest-item">
                  Quest 2 - Finished in 45 minutes
                </li>
                {/* Additional past quest items */}
                <li className="past-quest-item">
                  Quest 3 - Finished in 40 minutes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
