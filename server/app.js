const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  // создаем соккет, к которому обращемся с index.vue
  socket.on("userJoined", (data, cb) => {
    //cb - callback

    // проверяем получаем ли данные, если нет, то возвращаем ошибку
    if (!data.name || !data.room) {
      return cb("Данные некорректны");
    }

    // если все ок, то возвращаем объект данных
    cb({ userId: socket.id });
    // отправка сообщения пользователю при входе в комнату
    socket.emit("newMessage", m("Admin", `Добро пожаловать, ${data.name}`));
  });

  socket.on("createMessage", data => {
    setTimeout(() => {
      socket.emit("newMessage", {
        text: data.text + " SERVER"
      });
    }, 500);
  });
});

module.exports = {
  app,
  server
};
