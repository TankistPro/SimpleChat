export let initialState = {
    userList: [],
    currentUser: null,
    messageData: []
}

export function reducer(state, action) {
    switch(action.type) {
        case 'initRoomUsers':
            return { ...state, userList: state.userList = action.payload };
        case 'initUser':
            return { ...state, currentUser: state.currentUser = action.payload };
        case 'removeUser':
            let users = [];
            state.userList.forEach((user, index) => {
                if(user === action.username) {
                    console.log('пользователь найден')
                    users = state.userList.splice(index, 1)
                }
            });
            return { ...state, userList: users}
        case 'exit':
            return {
                userList: [],
                currentUser: null
            }
        case 'newMessage': {
            state.messageData.push(action.payload)
            return {
                ...state, messageData: state.messageData
            };
        }
        default:
            return state.userList;
    }
}