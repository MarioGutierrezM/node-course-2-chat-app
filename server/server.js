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

    // show the message only for to the new connected user
    socket.emit('newMessage', {
        from: 'Administrator',
        text: 'Welcome to the chat app',
        createAt: new Date().getTime()
    });

    // broadcast makes the emit to the others users
    socket.broadcast.emit('newMessage', {
        from: 'Administrator',
        text: 'New user joined',
        createAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', JSON.stringify(newMessage, undefined, 2));

        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createAt: new Date().getTime()
        });

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
