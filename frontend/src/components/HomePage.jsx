import React, { useContext } from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content">
        <div className="login-box">
          <h1 className="treasure-title">Welcome, {name}!</h1>
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
    </div>
    
  )
  :
  (<TreasureLogin/>);
};

export default HomePage;
