const http = require('http')
const socket = require('socket.io');

const { rooms } = require("../localStarage/db");

const { Room } = require("../classes/room");

module.exports.initSocket = (app) => {
  const server = http.createServer(app);
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('Пользвоатель подключился');
    const room = Room(io, socket);

    socket.on('connect-room', ({id_room, username}) => {
      room.connectUserToRoom(id_room, username);
    });

    socket.on('disconnected', ({id_room, username}) => {
      room.leaveRoom(id_room, username);
    });

    socket.on('send-message', payload => {
      room.sendMessage(payload);
    })
  })

  io.listen(5505)
}
