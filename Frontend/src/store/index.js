import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      authToken: "",
      authId: "",
      isAuth: false,
    };
  },
  mutations: {
    setAuthData(state, payload) {
      state.authToken = payload.token;
      state.authId = payload.id;
      state.isAuth = payload.isAuth
    },
  },
  getters: {
    authToken(state) {
      return state.authToken;
    },
    authId(state) {
      return state.authId;
    },
    isAuth(state) {
      return state.isAuth;
    }
  },
  actions: {},
  modules: {},
});
