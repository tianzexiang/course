import { IUser } from "@/types";
import { createStore } from "vuex";
import * as api from "../services/api";
interface IState {
  user: IUser | null;
}

export default createStore<IState>({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser: (state, user: IUser) => {
      console.log("user: ", user);
      state.user = user;
    },
  },
  actions: {
    logout: async (context) => {
      const res = await api.logout();
      if (res.stat === "OK") {
        context.commit("setUser", null);
        return true;
      }
      return false;
    },
  },
  modules: {},
});
