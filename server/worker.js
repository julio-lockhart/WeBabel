const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const redisConnection = require("./redis-connection");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

redisConnection.on("message_received", async (data, channel) => {
   console.log("message recieved in worker");

   const userId = data.userId;
   const payload = data.payload;
   const message = {
      senderId: payload.senderId,
      roomId: payload.roomId,
      text: payload.text,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      urls: payload.urls
   }

   console.log("User ID", userId);
   console.log("message", message);
   console.log("Key", `${userId}:${message.roomId}`);

   //await client.lpushAsync(HISTORY_LIST, JSON.stringify(person));
   //console.log('value', value);
});