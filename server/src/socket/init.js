const http = require('http')
const socket = require('socket.io');

const rooms = new Map();

module.exports.initSocket = (app) => {
  const server = http.createServer(app);
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('Пользователь подключился');
  
    socket.on('connect-room', (user) => {
      if(!rooms.has(user.id_room)) {
        rooms.set(user.id_room, new Map().set(socket.id, user.username))
      } else {
        rooms.get(user.id_room).set(socket.id, user.username)
      }

      console.log(rooms);
    })
  })

  io.listen(5505)
}