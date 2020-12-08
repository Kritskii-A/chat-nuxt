export const state = () => ({
  user: {},
  messages: [],
  users: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    state.user = {}; // очищаем даннные пользователя
    state.messages = []; // очищаем сообщения
    state.users = []; // очищаем пользователей
  },
  // ниже вся логика по приему новых сообщений во frontend
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  // просто его перезаписываем
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
};
