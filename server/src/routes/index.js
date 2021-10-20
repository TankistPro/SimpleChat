const { rooms } = require('../localStarage/db');

module.exports.initRoutes = (app) => {
    app.get('/rooms', (req, res) => {
        const roomsId = [...rooms.keys()];
        let payload = [];

        roomsId.forEach(room => {
            const usersMap = [...rooms.get(room).get('users').values()];

            const users = [];

            usersMap.forEach(user => {
                users.push(Object.fromEntries(user));
            });

            payload.push({
                roomId: room,
                userCount: users.length,
                users: users
            })
        })

        res.status(200).json({
            payload
        })
    })
}
