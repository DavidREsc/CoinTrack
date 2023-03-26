import { useEffect } from 'react'
import {io} from 'socket.io-client'

const URL = '/'
const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket'],
    path: '/socket'
});

const useSocket = () => {
    useEffect(() => {
        socket.connect()
        socket.on('connect', () => console.log('Connected'))
        return () => {
            socket.off('connect')
            socket.disconnect()
        }
    }, [])
    return {socket}
}

export default useSocket;
