const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const { generateMessage } = require('./utils/message');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // show the message only for to the new connected user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // broadcast makes the emit to the others users
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', JSON.stringify(newMessage, undefined, 2));

        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');

        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconncted');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
