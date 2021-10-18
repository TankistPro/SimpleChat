import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import { socket } from '../../sockets/socket';

import AsideMenu from '../asideMenu/asideMenu.jsx';

import { initialState, reducer } from '../../reducer/reducer'

import './room.scss';

function Room () {
    const history = useHistory();
    let [message, setMessage] = React.useState('');
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        socket.on('new-message', (messages) => {
            console.log(messages)
            dispatch({
                type: 'newMessage',
                payload: messages
            })
            console.log(state)
        })
    }, [])

    const sendMessage = () => {
        const messagePayload = {
            from: state.currentUser,
            text: message,
            date: Date.now()
        };

        setMessage('');

        socket.emit('send-message', messagePayload);
    }

    const exit = () => {
        socket.emit('disconnected', state.currentUser);
        dispatch({
            type:'exit'
        });
        history.push('/');
    }

    const sendHandler = (e) => {
        if(e.keyCode === 13) sendMessage()
    }

    return (
        <div>
            <header>
                <h1>Room #{ state.currentUser.room_id }</h1>
                <div className="right-bar">
                    <div className="exit" onClick={exit}>
                        <p>Отключиться</p>
                    </div>
                </div>
            </header>
            <main>
                <AsideMenu />
                <div className="wrapper-block">
                    <div className="wrapper-block__chat">
                        {state.messageData.map((message, index) => (
                            <div key={index} className={
                                `message-item ${state.currentUser.username ===
                                    message.from ?
                                    'your-message' : ''}`
                                }
                            >
                                <div className="avatar">
                                    <img src={message.avatarUrl} alt=""/>
                                </div>
                                <div className="message-item__data">
                                    <p>{ message.text }</p>
                                    <small>{ new Date(message.date).toLocaleString() }</small>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bottom">
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={ sendHandler }
                            rows="4"
                            cols="5"
                            placeholder="Введите сообщение...">
                        </textarea>
                        <div className="send-btn" onClick={sendMessage}>
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 18L21.5 9L0.5 0V7L15.5 9L0.5 11V18Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Room;
