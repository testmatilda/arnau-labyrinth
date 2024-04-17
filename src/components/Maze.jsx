import { useState } from 'react';
import { LoginStart } from './LoginStart';
import { GameScreen } from './GameScreen';
import useLogginStore from '../stores/logginStore';

export const Maze = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      // Perform login actions here, like setting isLoggedIn to true after successful login
      setIsLoggedIn(true);
      await useLogginStore.getState().startGame(); // This function should fetch initial game state
    } catch (error) {
      console.error('Failed to start the game:', error);
      // Handle error, display error message to the user
    }
  };

  return (
    <div>
      {!isLoggedIn && <LoginStart onLogin={handleLogin} />}
      {isLoggedIn && <GameScreen />}
    </div>
  );
};

