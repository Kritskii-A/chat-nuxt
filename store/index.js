export const state = () => ({
  user: {},
  messages: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    state.user = {}; // очищаем даннные пользователя
    state.messages = []; // очищаем сообщения
  }
};

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log("Message received", data);
  }
};
