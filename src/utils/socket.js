import io from 'socket.io-client'

const socket = io.connect(process.env.VUE_APP_WS_API, {
  debug: true,
  timeout: 300000,
  transports: ['websocket'],
  reconnectionDelayMax: 1000,
  reconnectionDelay: 500
})

export default socket
