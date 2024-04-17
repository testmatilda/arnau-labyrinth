import { useState } from "react"
import useLogginStore from "../stores/logginStore"

export const LoginStart = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleStartGame = async () => {
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);
    try {
      await useLogginStore.getState().startGame(username);
    } catch (error) {
      setError('Failed to start the game. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-start">
      <h1>WELCOME TO THE MAZE</h1>
      <p>Only the brave ones will escape.</p>
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        placeholder="Type your username here"
        aria-label="Enter your username"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleStartGame} disabled={isLoading}>
        {isLoading ? 'Starting...' : 'Start Game'}
      </button>
    </div>
  );
};

