const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require('cors');
const bodyParser = require("body-parser");
const configRoutes = require('./routes');

// Socket IO
const io = require("socket.io")(http);
const redisConnection = require("./redis-connection");
const serverIO = io.of("/server-IO");

const Constants = require('./constants.js');
const ChatkitServer = require('pusher-chatkit-server');

const chatkitServer = new ChatkitServer.default({
   instanceLocator: Constants.instanceLocator,
   key: Constants.key
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuring routes
configRoutes(app);

// Setting port number
//app.set('port', process.env.PORT || 3000);
app.set('port', 3001);

serverIO.on("connect", socket => {
   console.log('Socket Connected');

   socket.on('send_payload', response => {
      redisConnection.emit("message_received", response);
   })
});

http.listen(app.get('port'), () => {
   console.log("We've now got a server!");
   console.log("Your routes will be running on http://localhost:" + app.get('port'));
});