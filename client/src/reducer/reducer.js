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
            return { ...state, currentUser: state.currentUser = action.payload.user, messageData: state.messageData = action.payload.messageList };
        case 'removeUser':
            let users = [];
            state.userList.forEach((user, index) => {
                if(user.username === action.username) {
                    console.log('пользователь найден')
                    state.userList.splice(index, 1)
                }
            });
            return { ...state, userList:  state.userList}
        case 'exit':
            return {
                userList: [],
                currentUser: null,
                messageData: []
            }
        case 'newMessage': {
            return {
                ...state, messageData: state.messageData = action.payload
            };
        }
        default:
            return state.userList;
    }
}
