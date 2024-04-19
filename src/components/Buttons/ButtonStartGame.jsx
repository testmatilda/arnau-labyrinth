import useLoginStore from './loginStore';

export const ButtonStartGame = () => {
  const { isLoading, startGame } = useLoginStore();

  const handleClick = () => {
    startGame();
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Starting...' : 'Start Game'}
    </button>
  );
};
