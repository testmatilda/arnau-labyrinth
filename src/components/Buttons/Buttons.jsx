import "./Buttons.css";
import { useGlobalStoreData } from "../../stores/storeData";

export const RestartButton = () => {
  const { startGame } = useGlobalStoreData();

  const handleRestart = () => {
    // Reset the login data in the store
    useGlobalStoreData.setState({
      logindata: {
        isLoggedIn: false,
        username: "",
        type: null,
        direction: null,
        coordinates: null,
      },
    });

    // Call startGame to restart the game
    startGame(""); // Pass an empty string as username to restart the game
  };

  return (
    <button className="otherButtons restart" onClick={handleRestart}>
      Restart
    </button>
  );
};

export const AudioButton = () => {
  return (
    <>
      <button className="otherButtons audio">Audio</button>
    </>
  );
};
