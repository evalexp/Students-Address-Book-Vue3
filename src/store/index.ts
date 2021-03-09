import { createStore } from "vuex";
import persistedSate from "vuex-persistedstate";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [persistedSate()],
});
