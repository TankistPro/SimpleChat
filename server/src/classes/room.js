const { rooms } = require("../localStarage/db");

class Room {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }

    connectUserToRoom(room_id, username) {
        this.socket.join(room_id);

        if(!rooms.has(room_id)) {
            rooms.set(room_id, new Map().set('users', new Map().set(this.socket.id, username)).set('messages', new Map()));
        } else {
            if(this._existUserInRoom(room_id, username)) {
                this.io.to(this.socket.id).emit('exist-user');

                return;
            }

            rooms.get(room_id).get('users').set(this.socket.id, username)
        }

        console.log(rooms);

        const users = [...rooms.get(room_id).get('users').values()];
        const messagesMap = [...rooms.get(room_id).get('messages').values()]

        const messages = []

        messagesMap.forEach(m => {
            messages.push(Object.fromEntries(m))
        })

        // console.log(messages);
        const connectUserInitData = {
            user: {
                room_id,
                username
            },
            messages
        }

        this.io.to(this.socket.id).emit('successful-connect', connectUserInitData);

        this.io.to(room_id).emit('connected-user', users);
    }

    leaveRoom(user) {
        console.log(user)
        rooms.get(user.room_id).get('users').delete(this.socket.id);

        this.io.to(user.room_id).emit('disconnected-user', user.username);
    }

    sendMessage(payload) {
        rooms.get(payload.from.room_id).get('messages').set(payload.date,
            new Map().set('text', payload.text).set('date', payload.date)
                .set('from', payload.from.username).set('room_id', payload.from.room_id));

        const messagesMap =  [...rooms.get(payload.from.room_id).get('messages').values()]

        const messages = []

        messagesMap.forEach(m => {
            messages.push(Object.fromEntries(m))
        })

        console.log(rooms.get(payload.from.room_id));

        this.io.to(payload.from.room_id).emit('new-message', messages);
    }

    _existUserInRoom(room_id, username) {
        const usersRoom = rooms.get(room_id).get('users').values();

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
