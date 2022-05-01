import { useContext } from 'react';
import { SocketContext } from '../contexts/socket';

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};
