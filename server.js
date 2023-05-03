const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", (socket)=>{
    socket.on("newuser", (username)=>{
        socket.broadcast.emit("update", username +" startd the war")
    })

    socket.on("exituser", (username)=>{
        socket.broadcast.emit("update", username +" left the war")
    })

    socket.on("chat",(message)=>{
        socket.broadcast.emit("chat", message );
    })
})

server.listen(3000, ()=>{
    console.log("server connected in the port 3000");
})
