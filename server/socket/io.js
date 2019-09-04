import socketIO from 'socket.io';

const io = socketIO();

io.on('connection',(client)=>{
    client.on('auth',(userId) => {
       client.userId = userId.id;
    })
},require('../routes/index'));

export default io;

