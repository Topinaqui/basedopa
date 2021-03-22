const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};
io.on('connection', socket => {
    const { username } = socket.handshake.query;

    connectedUsers[username] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

server.listen(3333)

require('./app/controllers/index')(app)
