import { useState } from "react";
import { useGlobalStoreData } from "../stores/storeData";
import { Footer } from "./Footer";
import { ReactTyped } from "react-typed";
import "./LoginStart.css";
import { AudioButton } from "./Buttons/Buttons";

export const LoginStart = ({ onStartGameLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleStartGame = async () => {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    try {
      await useGlobalStoreData.getState().startGame(username);
    } catch (error) {
      setError("Failed to start the game. Please try again later.");
    } finally {
      setLoading(false);
    }

    onStartGameLogin();
  };

  return (
    <div className="login-background">
      <div className="container-start">
        <h1>WELCOME TO THE MAZE</h1>
        <p>Step into the darkness, where shadows whisper.</p>
        <ReactTyped
          strings={["Dare you face the mysteries of the labyrinth?"]}
          typeSpeed={100}
          showCursor={false}
        />
        <p></p>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Type username here"
          aria-label="Enter your username"
        />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleStartGame} disabled={isLoading}>
          {isLoading ? "Starting..." : "Start Game"}
        </button>
      </div>
      <AudioButton></AudioButton>
      <Footer />
    </div>
  );
};
