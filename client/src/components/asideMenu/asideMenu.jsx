import React from 'react';

import { socket } from '../../sockets/socket';

import { initialState, reducer } from '../../reducer/reducer'

import './asideMenu.scss';

const AsideMenu = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        socket.on('connected-user', (users) => {
            dispatch({
                type: 'initRoomUsers',
                payload: users
            })
        })

        socket.on('disconnected-user', (username) => {
            console.log('Пользователь вышел из чата', username)
            dispatch({
                type: 'removeUser',
                username
            })
        })

        console.log(state)
    }, [])

    return (
        <aside>
            <h2>Участники { state.userList.length }</h2>
            <ul>
            {state.userList.map((user, index) =>
                <li key={index} className={state.currentUser.username ===
                user ? 'my-account' : ''}>
                 {index + 1}. {user}
                </li>
            )}
            </ul>
        </aside>
    );
}

export default AsideMenu;
