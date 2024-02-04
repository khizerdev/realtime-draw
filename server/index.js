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
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
