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
  },
  // ниже вся логика по приему новых сообщений во frontend
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
};
