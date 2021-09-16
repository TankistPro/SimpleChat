import { io } from 'socket.io-client';

export const socket = io('http://localhost:5505/', {
  transports: ['websocket'],
});
