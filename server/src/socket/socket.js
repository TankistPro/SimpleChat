const http = require('http')
const socket = require('socket.io');

const { rooms } = require("../db/db");

module.exports.initSocket = (app) => {
  const server = http.createServer(app);
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('Пользователь подключился');
  
    socket.on('connect-room', ({id_room, username}) => {
      socket.join(id_room);

      if(!rooms.has(id_room)) {
        rooms.set(id_room, new Map().set(socket.id, username))
      } else {
        rooms.get(id_room).set(socket.id, username)
      }

      const users = [...rooms.get(id_room).values()];

      io.to(id_room).emit('connected-user', users);

      console.log(rooms);
    });

  })

  io.listen(5505)
}