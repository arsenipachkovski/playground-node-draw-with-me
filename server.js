var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

var drawMap = [];

io.sockets.on('connection', (socket)=> {
    for(let i of drawMap) {
        socket.emit('mouseMove', i)
    }
    socket.on('mouseMove', (data) => {
        drawMap.push(data)
        socket.broadcast.emit('mouseMove', data)
    });
    socket.on('clear', () => {
        drawMap = [];
        socket.broadcast.emit('clear', true)
    })
});

server.listen(port, () => {
    console.log('connected')
});