import { useState } from "react";
import { useLoginStore } from "../stores/loginStore";
import "./GameScreen.css";

export const GameScreen = ({ actions }) => {
  const [isLoading, setLoading] = useState(false);

  const getDescription = () => {
    return useLoginStore.getState().gamedata.description;
  };

  const getCoordinates = () => {
    return useLoginStore.getState().gamedata.coordinates;
  };

  const getActions = () => {
    return useLoginStore.getState().gamedata.actions[0];
  };

  const handleAction = async (action) => {
    setLoading(true);
    try {
      await useLoginStore.getState().sendAction("TechnigoPlayer", action);
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
        <p>{getActions}</p>
        <div className="actions">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              disabled={isLoading}
            >
              {action.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
