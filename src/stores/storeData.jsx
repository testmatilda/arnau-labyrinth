import { create } from "zustand";
import axios from "axios"; //this is an AI recomendation

const storeData = (set, get) => ({
  logindata: {
    isLoggedIn: false,
    username: "",
  },
  gamedata: {},
  isLoggedIn: () => {
    return get().logindata.isLoggedIn;
  },
  username: () => {
    return get().logindata.username;
  },
  startGame: async (username) => {
    const response = await axios.post("https://labyrinth.technigo.io/start", {
      username,
    });
    set({ logindata: { isLoggedIn: true, username: username } });
    set({ gamedata: response.data });
    console.log(response.data);
  },
  sendAction: async (username, actions) => {
    const response = await axios.post("https://labyrinth.technigo.io/action", {
      username,
      ...actions,
    });
    set({ gamedata: response.data });
  },
});

export const useGlobalStoreData = create(storeData);
