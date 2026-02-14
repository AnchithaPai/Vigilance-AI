const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// 1. Receives data from the Chrome Extension
app.post('/log-risk', (req, res) => {
    console.log("Risk Signal:", req.body);
    // 2. Forwards data to the Teacher Dashboard via WebSockets
    io.emit('teacher-alert', req.body);
    res.sendStatus(200);
});

server.listen(5000, () => console.log('Server running on http://localhost:5000'));
