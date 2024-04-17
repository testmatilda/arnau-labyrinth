export const GameScreen = ({ description, actions }) => {
  const handleAction = (action) => {
    // Handle action logic here
  };

  return (
    <div className="game-screen">
      <h2>Game Screen</h2>
      <p>{description}</p>
      <div className="actions">
        {actions.map((action, index) => (
          <button key={index} onClick={() => handleAction(action)}>
            {action.description}
          </button>
        ))}
      </div>
    </div>
  );
};
