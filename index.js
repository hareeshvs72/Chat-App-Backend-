import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on('message', (message) => {
        console.log("Message received:", message);
        io.emit("message", message);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});