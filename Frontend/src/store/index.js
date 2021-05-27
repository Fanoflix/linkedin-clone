import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: null,
      authToken: "",
      authId: "",
      isAuth: false,
    };
  },
  mutations: {
    setAuthData(state, payload) {
      state.user = payload.user;
      state.authToken = payload.token;
      state.authId = payload.id;
      state.isAuth = payload.isAuth;

      localStorage.setItem("token", state.authToken);
      localStorage.setItem("userId", state.authId);
      localStorage.setItem("isAuth", state.isAuth);
      localStorage.setItem("user", state.user);      
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
    },
    user(state) {
      return state.user;
    },
  },
  actions: {},
  modules: {},
});
