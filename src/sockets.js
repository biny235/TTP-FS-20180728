import io from 'socket.io-client'
const socket = io('https://ws-api.iextrading.com/1.0/tops')



socket.on('connect', () => {

  console.log('connected')
  
})

// Disconnect from the channel
socket.on('disconnect', () => console.log('Disconnected.'))

export default socket;