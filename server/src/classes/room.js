const { rooms } = require("../localStarage/db");

class Room {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        this.room_id = null;
    }

    connectUserToRoom(room_id, username) {
        this.room_id = room_id;

        this.socket.join(this.room_id);

        const avatarUrl = this._generateAvatarUrl(username);

        if(!rooms.has(this.room_id)) {
            rooms.set(this.room_id, new Map().set('users', new Map().set(this.socket.id, new Map().set('username', username)
                .set('avatarUrl', avatarUrl))).set('messages', new Map()));
        } else {
            if(this._existUserInRoom(this.room_id, username)) {
                this.io.to(this.socket.id).emit('exist-user');

                return;
            }

            rooms.get(this.room_id).get('users').set(this.socket.id, new Map().set('username', username).set('avatarUrl', avatarUrl))
        }

        const messages = this._parsingMessages();
        const users = this._parsingUsers();

        const connectUserInitData = {
            user: {
                room_id,
                username,
                avatarUrl
            },
            messages
        }

        this.io.to(this.socket.id).emit('successful-connect', connectUserInitData);
        this.io.to(this.room_id).emit('connected-user', users);
    }

    leaveRoom(user) {
        rooms.get(this.room_id).get('users').delete(this.socket.id);

        this.io.to(this.room_id).emit('disconnected-user', user.username);

        this.room_id = null;
    }

    sendMessage(payload) {
        rooms.get(this.room_id).get('messages').set(payload.date,
            new Map().set('text', payload.text).set('date', payload.date)
                .set('from', payload.from.username).set('room_id', this.room_id)
                    .set('avatarUrl', payload.from.avatarUrl));

        const messages = this._parsingMessages(this.room_id);

        this.io.to(this.room_id).emit('new-message', messages);
    }

    _existUserInRoom(room_id, username) {
        const usersRoom = rooms.get(this.room_id).get('users').values();

        for (let user of usersRoom) {
            if(user === username) {
                return true;
            }
        }

        return false;
    }

    _parsingUsers() {
        const usersMap = [...rooms.get(this.room_id).get('users').values()];

        const users = []

        usersMap.forEach(user => {
            users.push(Object.fromEntries(user));
        });

        return users;
    }

    _parsingMessages(){
        const messagesMap =  [...rooms.get(this.room_id).get('messages').values()];

        const messages = [];

        messagesMap.forEach(m => {
            messages.push(Object.fromEntries(m));
        });

        return messages;
    }

    _generateAvatarUrl(username) {
        return `https://avatars.dicebear.com/api/avataaars/${username}.svg`
    }
}

module.exports.Room = (io, socket) => {
    return new Room(io, socket)
};
