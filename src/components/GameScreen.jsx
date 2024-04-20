import { useState } from "react";
import { useGlobalStoreData } from "../stores/storeData";
import { ReactTyped } from "react-typed";
import "./GameScreen.css";

export const GameScreen = ({ actions }) => {
  const [isLoading, setLoading] = useState(false);

  const getDescription = () => {
    return useGlobalStoreData.getState().gamedata.description;
  };

  const getCoordinates = () => {
    return useGlobalStoreData.getState().gamedata.coordinates;
  };

  const getActions = () => {
    return useGlobalStoreData.getState().gamedata.actions;
  };

  const handleAction = async (action) => {
    setLoading(true);
    try {
      await useGlobalStoreData.getState().sendAction("TechnigoPlayer", action);
    } catch (error) {
      console.error("Failed to perform action:", error);
      // Handle error, display error message to the user
    } finally {
      setLoading(false);
    }
  };

  // Dynamically set the background image URL based on coordinates
  const cleanCoordinates = getCoordinates().replace(',', '-');
  const backgroundImageUrl = `url("src/assets/background-image-${cleanCoordinates}.png"`

  return (
    <div className="game-screen-background"
    style={{ backgroundImage: backgroundImageUrl }}
    >
      <div className="game-screen">
        <p>{getDescription()}</p>
        <p>{getActions().description}</p>
        <div className="actions">
          {/* {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              disabled={isLoading}
            >
              <p>{action.description}</p>
            </button>
          ))} */}
          {getActions().map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              disabled={isLoading}
            >
              <p>{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
