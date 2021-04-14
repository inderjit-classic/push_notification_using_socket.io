const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
  });

const socketIO = require('socket.io');
const io = socketIO(server,{
    cors: {
        origin: "http://localhost:4300"
      }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('new-message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', msg);
      });
  });

  
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});