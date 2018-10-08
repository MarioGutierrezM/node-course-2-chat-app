const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'MarIO@itx.net',
        text: 'hello, this is a new message!',
        createAt: new Date()
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', JSON.stringify(newEmail, undefined, 2));
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', JSON.stringify(newMessage, undefined, 2));
    });

    socket.on('disconnect', () => {
        console.log('User was disconncted');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
