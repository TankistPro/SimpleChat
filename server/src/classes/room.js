const { rooms } = require("../localStarage/db");

class Room {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    connectUserToRoom(room_id, username) {
        this.socket.join(room_id);

        if(!rooms.has(room_id)) {
            rooms.set(room_id, new Map().set(this.socket.id, username))
        } else {
            if(this._existUserInRoom(room_id, username)) {
                this.io.to(this.socket.id).emit('exist-user');

                return;
            }

            rooms.get(room_id).set(this.socket.id, username)
        }

        const users = [...rooms.get(room_id).values()];

        this.io.to(this.socket.id).emit('successful-connect', {room_id, username});

        this.io.to(room_id).emit('connected-user', users);
    }

    leaveRoom(room_id, username) {
        rooms.get(room_id).delete(this.socket.id);

        this.io.to(room_id).emit('disconnected-user', username);
    }

    sendMessage(payload) {
        this.io.to(payload.from.id_room).emit('new-message', payload);
    }

    _existUserInRoom(room_id, username) {
        const usersRoom = rooms.get(room_id).values();

        for (let user of usersRoom) {
            if(user === username) {
                return true;
            }
        }

        return false;
    }
}

module.exports.Room = (io, socket) => {
    return new Room(io, socket)
};
