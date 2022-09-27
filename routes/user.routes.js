const express = require('express')
const router = express.Router()
const User = require('../model/User')
const Exercises = require('../model/Exercises')

// routes
router.post('/', async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username });
        const createdUser = await newUser.save();

        res.status(201).json({ username: createdUser.username, _id: createdUser._id });
    } catch (error) {
        throw new Error("Failed create new user")
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).send(users);
    } catch (error) {
        throw new Error('Failed to get list users');
    }
});

router.post('/:_id/exercises', async (req, res) => {
    try {
        const { _id } = req.params;
        const { description, duration, date } = req.body;
        const newDate = date ? new Date(date).toDateString() : new Date().toDateString();
        let message, status;

        const exercises = new Exercises({ username: _id, description, duration, date: newDate });
        const createdExercises = await exercises.save();
        await createdExercises.populate('username');

        if (createdExercises) {
            status = 201;
            message = {
                _id: createdExercises.username._id,
                username: createdExercises.username.username,
                date: new Date(createdExercises.date.getTime()).toDateString(),
                duration: createdExercises.duration,
                description: createdExercises.description
            }
        } else {
            status = 500;
            message = { error: "There some error" };
        }

        res.status(status).json(message);
    } catch (error) {
        throw new Error('Failed to create exercises');
    }
});

router.get('/:_id/logs', async (req, res) => {
    try {
        const { _id } = req.params;
        const { from, to, limit } = req.query;

        let pipeline = [
            { $project: { _id: 0, description: 1, duration: 1, date: 1 } },
            { $sort: { date: -1 } },
        ];

        if (from && to) pipeline.unshift({ $match: { "date": { $gte: new Date(from), $lte: new Date(to) } } })
        else if (from) pipeline.unshift({ $match: { "date": { $gte: new Date(from) } } })
        else if (to) pipeline.unshift({ $match: { "date": { $lte: new Date(to) } } })
        limit && pipeline.unshift({ $limit: parseInt(limit) })

        const user = await User.findById(_id);
        const logs = await Exercises.aggregate(pipeline);
        const newLogs = logs.map(log => {
            return {
                description: log.description,
                duration: log.duration,
                date: new Date(log.date.getTime()).toDateString()
            }
        });

        let message = {
            _id: user._id,
            username: user.username,
            count: logs.length,
            log: newLogs
        }

        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get logs user exercise');
    }
})

module.exports = router;