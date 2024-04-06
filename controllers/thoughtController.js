const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find().select("-__v");

            res.json({ allThoughts });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const requestedThought = await Thought.findById(req.params.thoughtId).select("-__v");
            if (!requestedThought) {
                return res.status(404).json({ message: 'No Thought with that ID' })
            }

            res.json({ requestedThought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async addThought(req, res) {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                return res.status(404).json({ message: "no user with that username" });
            }

            const newThought = await Thought.create(req.body);
            await User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: newThought._id } });

            res.json({ newThought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body.thoughtText);
            if (!updatedThought) {
                return res.status(404).json({ message: "No Thought with that ID" })
            }

            res.json({ updatedThought })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async removeThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deletedThought) {
                return res.status(404).json({ message: "No Thought with that ID" });
            }
            res.json({deletedThought});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // async 

}