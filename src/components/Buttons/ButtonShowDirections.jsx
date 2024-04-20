
export const ButtonShowDirections = () => {
  return (
    <>
      <Button>Show Directions</Button>
      <div className="actions">
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
  </>
  )
}
