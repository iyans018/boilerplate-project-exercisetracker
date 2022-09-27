const express = require('express')
const router = express.Router()
const User = require('../model/User')

// routes
router.post('/', async (req, res) => {
    try {
        const newUser = await new User({ username: req.body.username });
        const createdUser = await newUser.save();

        res.status(201).json({ username: createdUser.username, _id: createdUser._id });
    } catch (error) {
        throw new Error("Failed create new user")
    }
});

module.exports = router;