import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
    },
  },
  getters: {},
  mutations: {
    setName: (state, name) => {
      state.user.name = name;
    },
  },
  actions: {},
  modules: {},
});
