import { useEffect } from 'react'
import {io} from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../types';
import { Socket } from 'socket.io-client';

const URL = '/'
const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io(URL, {
    autoConnect: false,
    transports: ['websocket'],
    path: '/socket'
});

const initSocket = () => {
    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])
    return {socket}
}

export default initSocket;