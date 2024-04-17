import useLogginStore from './logginStore';

export const ButtonStartGame = () => {
  const { isLoading, startGame } = useLogginStore();

  const handleClick = () => {
    startGame();
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Starting...' : 'Start Game'}
    </button>
  );
};
