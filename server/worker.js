const redisConnection = require("./redis-connection");

redisConnection.on("message_received", async (data, channel) => {
   console.log("message recieved in worker");
   console.log('data', data);
});