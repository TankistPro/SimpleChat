export let initialState = {
    userList: [],
    currentUser: null
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
        default:
            return state.userList;
    }
}