const express = require('express');
const router = express.Router();
const axios = require('axios');

const Constants = require('../constants.js');
const ChatkitServer = require('pusher-chatkit-server');

const chatkitServer = new ChatkitServer.default({
    instanceLocator: Constants.instanceLocator,
    key: Constants.key
});

// Returns all users
router.get("/getUsers/", async (req, res) => {
    await chatkitServer.getUsers()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
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

module.exports = router;