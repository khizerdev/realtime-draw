const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Client is connected id: ${socket}`);

  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg);
  });

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg);
  });

  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg);
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
