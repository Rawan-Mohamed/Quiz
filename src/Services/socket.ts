// Socket.IO client setup for real-time quiz sessions
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3005'; // Update if your backend uses a different URL/port

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('authToken'),
      },
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
