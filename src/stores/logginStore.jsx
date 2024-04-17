import { create } from 'zustand';

const useLogginStore = create((set) => ({
  username: '',
  isLoading: false,
  error: null,

  setUsername: (username) => set({ username }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  startGame: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('https://labyrinth.technigo.io/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Type your user name', // You can change this to use a dynamic username if needed
        }),
      });
      const data = await response.json();
      // Handle data as needed
      console.log('Game started:', data);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useLogginStore;
