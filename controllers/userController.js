const User = require("../models/User");

const createUser = (req, res) => {

    const { username } = req.body;

if (!username) {
    return res.status(400).json({
        message: "Username is required"
    });
}

    User.createUser(username, (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(201).json({
            message: "User created successfully"
        });

    });

};

const getUsers = (req, res) => {

    User.getUsers((err, users) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(users);

    });

};

module.exports = {
    createUser,
    getUsers
};