const { User, Thought } = require('../models');

module.exports = {

    //gets all thoughts in the Thought collection
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find().select("-__v");

            res.json({ allThoughts });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //gets the thought with the designated ID
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

    // adds a thought to the Thoughts collection
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

    //updates the thought at the designated thought ID
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, {thoughtText: req.body.thoughtText});
            if (!updatedThought) {
                return res.status(404).json({ message: "No Thought with that ID" })
            }

            res.json({ updatedThought })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //removes the thought at the designated thought ID
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

    //adds a reaction into the designated thought
    async addReaction(req, res){
        try{
            const parentThought = await Thought.findById(req.params.thoughtId);
            if (!parentThought) {
                return res.status(404).json({ message: "No Thought with that ID" });
            }
            parentThought.reactions.push(req.body);
            parentThought.save();

            res.json({ parentThought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //removes reaction from a thought at a designated ID
    async removeReaction (req, res){
        try {
            const parentThought = await Thought.findById(req.params.thoughtId);
            if (!parentThought) {
                return res.status(404).json({ message: "No Thought with that ID" });
            }
            parentThought.reactions.splice(req.params.reactionId, 1);
            parentThought.save();

            res.json({ parentThought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}