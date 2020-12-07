const { Socket } = require("socket.io");

const app = require("express")(); // импорт экспресс в перменную app и вызываем функцию
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("Connected");
});

module.exports = {
  app,
  server
};
