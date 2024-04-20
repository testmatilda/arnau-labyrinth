import useGlobalStoreData from './storeData';

export const ButtonStartGame = () => {
  const { isLoading, startGame } = useGlobalStoreData();

  const handleClick = () => {
    startGame();
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Starting...' : 'Start Game'}
    </button>
  );
};
