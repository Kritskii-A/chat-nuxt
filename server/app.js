const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  // создаем соккет, к которому обращемся с index.vue
  socket.on("userJoined", (data, cb) => {
    //cb - callback

    // проверяем получаем ли данные, если нет, то возвращаем ошибку
    if (!data.name || !data.room) {
      return cb("Данные некорректны");
    }

    socket.join(data.room);

    users.remove(socket.id); // удаляем на всякий случай
    // добавляем пользователя
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });
    // если все ок, то возвращаем объект данных
    cb({ userId: socket.id });
    // отправка сообщения пользователю при входе в комнату
    socket.emit("newMessage", m("Admin", `Добро пожаловать, ${data.name}`));

    socket.broadcast
      .to(data.room) // вычеркиваем текущего пользователя и говорим в какую комнату нужно отправить сообщение
      .emit(
        "newMessage",
        m("Admin", `Пользователь ${data.name} вошел в комнату.`)
      );
  });

  socket.on("createMessage", (data, cb) => {
    if (!data.text) {
      return cb("Текст не может быть пустым");
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit("newMessage", m(user.name, data.text, data.id));
    }
    cb();
  });
});

module.exports = {
  app,
  server
};
