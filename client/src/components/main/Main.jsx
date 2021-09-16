import React from 'react';

import { Button, TextField } from '@material-ui/core';

import { socket } from '../../sockets/socket';
import './main.scss';

function Main() {
  const [username, setUsername] = React.useState('');
  const [room_id, setRoom] = React.useState('');
  const [isValidInputs, toggleValidInputs] = React.useState(false);

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log("Соединение с сервером успешно установлено")
    })
  })

  React.useEffect(() => {
    if(room_id.length && username.length) toggleValidInputs(true)
    else toggleValidInputs(false)
  }, [username, room_id])

  const connectServer = () => {
    socket.emit('connect-room', {
      username: username,
      id_room: room_id
    })
  }

  return (
    <div className="main">
      <div className="main-block">
        <h1>ClientCHAT</h1>
        <TextField 
          className="main-block__input" 
          value={ username } 
          onChange={e => setUsername(e.target.value)}
          id="outlined-basic" 
          label="Имя" 
          autoComplete="off"
          variant="outlined" 
        />
        <TextField 
          className="main-block__input" 
          value={ room_id  } 
          onChange={e => setRoom(e.target.value)}
          id="outlined-basic" 
          label="ID комнаты" 
          autoComplete="off"
          variant="outlined" 
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={ connectServer }
          disabled={ !isValidInputs }
        >Войти</Button>
      </div>

      <small>&copy;TankistPro Production</small>
    </div>
  );
}

export default Main;
