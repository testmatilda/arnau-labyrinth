import { useState } from "react";
import { useGlobalStoreData } from "../stores/storeData";
import { ReactTyped } from "react-typed";
import "./GameScreen.css";
import { AudioButton, RestartButton } from "./Buttons/Buttons";

export const GameScreen = ({ actions }) => {
  const [isLoading, setLoading] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showActions, setShowActions] = useState(false);

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
      const username = useGlobalStoreData.getState().username();
      await useGlobalStoreData
        .getState()
        .sendAction(username, action.type, action.direction);
    } catch (error) {
      console.error("Failed to perform action:", error); // Handle error, display error message to the user
    } finally {
      setLoading(false);
      setShowActions(false);
      setTypingComplete(false);
    }
  };

  // Dynamically set the background image URL based on coordinates
  const cleanCoordinates = getCoordinates().replace(",", "-");
  const backgroundImageUrl = `url("/background-image-${cleanCoordinates}.png"`;

  const hasDirections = getActions().some((action) => action.type === "move");

  return (
    <div
      className="game-screen-background"
      style={{ backgroundImage: backgroundImageUrl }}
    >
      <div className="game-screen">
        <ReactTyped
          strings={[getDescription()]}
          typeSpeed={40}
          showCursor={false}
          onComplete={() => setTypingComplete(true)}
        />
        {typingComplete && (
          <>
            {hasDirections && (
              <button
                className="otherButtons showDirections"
                onClick={() => setShowActions(!showActions)}
              >
                {showActions ? "Hide Directions" : "Show Directions"}
              </button>
            )}
            {showActions && (
              <div className="actions">
                {getActions().map((action, index) => (
                  <div key={index}>
                    {action.type === "move" && (
                      <button
                        className="btnDirection"
                        onClick={() => handleAction(action)}
                        disabled={isLoading}
                      >
                        Go: {action.direction}
                      </button>
                    )}
                    <p>{action.description}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <AudioButton></AudioButton>
        <RestartButton></RestartButton>
      </div>
    </div>
  );
};
