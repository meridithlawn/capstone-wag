const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});
const users = {};
io.on("connection", client => {
  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    });
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});
server.listen(3000);


// const WebSocket = require('ws');

// // starts server instance on http://localhost:8080
// const wss = new WebSocket.Server({ port: 8080 });

// // waits for connection to be established from the client
// // the callback argument ws is a unique for each client
// wss.on('connection', (ws) => {

//   // runs a callback on message event
//   ws.on('message', (data) => {

//     // sends the data to all connected clients
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(data);
//         }
//     });
//   });
// });