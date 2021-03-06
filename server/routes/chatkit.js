const express = require('express');
const router = express.Router();
const axios = require('axios');

const Constants = require('../constants.js');
const ChatkitServer = require('pusher-chatkit-server');

const chatkitServer = new ChatkitServer.default({
   instanceLocator: Constants.instanceLocator,
   key: Constants.key
});

// --------------------------------------
// User Routes
// --------------------------------------

// Returns all users
router.get("/getUsers/", async (req, res) => {
   await chatkitServer.getUsers()
      .then((result) => {
         res.status(200).json(result);
      }).catch((err) => {
         console.log(err);
      });
});

router.get("/getUserRoles/:userId", async (req, res) => {
   const id = req.params.userId;
   if (!id) throw "ID required";

   await chatkitServer.getUserRoles(id)
      .then((response) => {
         console.log(response);
         res.status(200).json(response);
      }).catch((err) => {
         console.log('Error getting user details', err);
         res.status(400).json(response);
      });
});

// Creates a user with the parameters in the bodyy
router.post("/createUser/", async (req, res) => {
   const id = req.body.id;
   const displayName = req.body.displayName;
   const avatarUrl = req.body.avatarUrl;

   if (!id) throw "ID required";
   if (!displayName) throw "ID required";

   await chatkitServer.createUser(id, displayName, avatarUrl)
      .then((response) => {
         console.log('User created successfully');
         console.log(response);

         res.status(200).json(response);
      }).catch((err) => {
         console.log('Error creating user', err);

         res.status(400).json(response);
      });
});

// Deletes a user with the specified ID
router.delete("/deleteUser/:id", async (req, res) => {
   const id = req.params.id;
   if (!id) throw "ID required";

   await chatkitServer.deleteUser(String(id))
      .then((response) => {
         console.log('User deleted successfully');
         res.sendStatus(200);
      }).catch((err) => {
         console.log(err);
         res.json(response);
      });
});

// Deletes all the users
router.delete("/deleteAllUsers/", async (req, res) => {
   await chatkitServer.getUsers()
      .then((result) => {

         for (let i = 0; i < result.length; i++) {
            console.log('Deleting user', result[i].id);

            chatkitServer.deleteUser(String(result[i].id))
               .then((response) => {
                  console.log('User deleted successfully');
               }).catch((err) => {
                  console.log(err);
               });
         }

         res.sendStatus(200);

      }).catch((err) => {
         console.log(err);
         res.sendStatus(400);
      });
});

// --------------------------------------
// Room Routes
// --------------------------------------

router.get("/getUserJoinableRooms/:userId", async (req, res) => {
   const userId = req.params.userId;

   if (!userId) throw "ID required";

   await chatkitServer.getUserJoinableRooms(String(userId))
      .then((result) => {
         console.log(result);
         res.json(result);
      }).catch((err) => {
         console.log(err);
         res.json(err);
      });
});

router.get("/getUserRooms/:userId", async (req, res) => {
   const userId = req.params.userId;

   if (!userId) throw "ID required";

   await chatkitServer.getUserRooms(String(userId))
      .then((result) => {
         console.log(result);
         res.json(result);
      }).catch((err) => {
         console.log(err);
         res.json(err);
      });
});

router.post("/createRoom", async (req, res) => {
   const userId = req.body.userId;
   const roomName = req.body.roomName;
   const isPrivate = req.body.isPrivate ? req.body.isPrivate : false;
   const userIds = req.body.userIds;

   await chatkitServer.createRoom(String(userId), {
      name: roomName,
      isPrivate,
      userIds
   }).then(result => {
      console.log(result);
      res.sendStatus(200).json(result);
   }).catch(err => {
      console.log(err);
      res.sendStatus(400);
   });
});

// --------------------------------------
// Roles
// --------------------------------------
router.post("/assignRoomRoleToUser", async (req, res) => {
   const userId = req.body.userId;
   const roleName = req.body.roleName;
   const roomId = req.body.roomId;

   if (!userId) throw "ID required";
   if (!roleName) throw "Role Name required";
   if (!roomId) throw "Room ID required";

   await chatkitServer.assignRoomRoleToUser({
      userId: 'userId',
      roleName: 'mycoolroomrole',
      roomId: 234
   })
      .then(() => {
         console.log('Assigned room role successfully');
         res.sendStatus(200);
      }).catch((err) => {
         console.log(err);
         res.json(err);
      });
})

module.exports = router;