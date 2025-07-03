export default function messageEventController(io) {
    io.on("connection", (socket) => {
  console.log("Connection: " + socket.id);
socket.on('disconnect', () => {
  console.log('Disconnection: ' + socket.id);
});
});
}

