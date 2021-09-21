import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import { socket } from '../../sockets/socket';

import { initialState, reducer } from '../../reducer/reducer'

import './room.scss';

function Room () {
    const history = useHistory();
    let [message, setMessage] = React.useState('');

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

        console.log(state.currentUser)
    }, [])

    const sendMessage = () => {
        console.log(message);

        setMessage('')
    }

    const exit = () => {
        socket.emit('disconnected', state.currentUser);
        socket.disconnect()

        history.push('/')
    }

    const sendHandler = (e) => {
        if(e.keyCode === 13) sendMessage()
    }

    return (
        <div>
            <header>
                <h1>Room</h1>
                <div className="right-bar">
                    <p>Участников: { state.userList.length }</p>
                    <Button 
                        variant="contained"
                        onClick={exit}
                    >
                        Отключиться
                    </Button>
                </div>
            </header>
            <main>
                <div className="bottom">
                    <TextField 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={ sendHandler }
                        className="input-chat" 
                        id="filled-basic" 
                        label="Введите сообщение..." 
                        variant="filled" 
                    />
                    <Button 
                        variant="contained"
                        onClick={sendMessage}
                    >
                        Отправить
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default Room;