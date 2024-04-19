import { create } from "zustand";
import axios from "axios"; //this is an AI recomendation

export const useLoginStore = create((set, get) => ({
  startGame: async (username) => {
    const response = await axios.post("https://labyrinth.technigo.io/start", {
      username,
    });
    set({ logindata: { isLoggedIn: true, username: username } });
    set({ gamedata: response.data });
    console.log(response.data);
  },
  sendAction: async (username, action) => {
    const response = await axios.post("https://labyrinth.technigo.io/action", {
      username,
      ...action,
    });
    set({ gamedata: response.data });
  },
  logindata: {
    isLoggedIn: false,
    username: ""
  },
  gamedata: {},
  username: () => {
    return get().logindata.username;
  },
  isLoggedIn: () => {
    return get().logindata.isLoggedIn;
  },  
}));
