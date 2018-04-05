const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const configRoutes = require('./routes');

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


app.listen(app.get('port'), () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:" + app.get('port'));
});