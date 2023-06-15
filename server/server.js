const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        // origin: 'http://localhost:3000',
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
app.use(cors());
io.on('connection', socket => {
    console.log('a user connected')
    socket.on('send-changes', delta => {
        socket.broadcast.emit('receive-changes', delta)
    })
})

app.use((req, res, next) => {
    req.io = io;
    next();
  });

  const PORT = 3001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));