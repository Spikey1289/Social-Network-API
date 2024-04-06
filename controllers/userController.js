const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');
const { findById } = require('../models/Thought');

module.exports = {
    async getUsers(req, res){
        try {
            const allUsers = await User.find().select("-__v");

            res.json({allUsers});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneUser(req,res) {
        try{
            const requestedUser = await User.findById(req.params.userId).select("-__v")
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            if (!requestedUser){
                return res.status(404).json({ message: 'No User with that ID'})
            }

            res.json({requestedUser});
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async addUser(req, res) {
        try{
            const newUser = await User.create(req.body);
            res.json({newUser});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: "No user with that ID" })
            }
            console.log(updatedUser.thoughts);

            if(req.body.username){
                await Thought.updateMany({_id: {$in: updatedUser.thoughts}}, {username: req.body.username});
            }

            res.json({updatedUser})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async removeUser(req,res){
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            if(!deletedUser){
                return res.status(404).json({ message: "No user with that ID" });
            }

            // removes all Thoughts this user is attributed to
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

            res.json(deletedUser);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async addUserFriend(req, res){
        try{
            const user = await User.findById(req.params.userId);
            const friendAdd = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.body.friendId } }, { new: true })
            if (user.friends.includes(`${req.body.friendId}`)) {
                return res.status(304).json({ message: "Friend already on your friends list" });
            }
            if (!friendAdd) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            res.json(friendAdd);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async removeUserFriend(req, res){
        try {
            const user = await User.findById(req.params.userId);
            const friendRemove = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.body.friendId } })

            if (!(user.friends.includes(`${req.body.friendId}`))){
                return res.status(404).json({ message: "No Friend with that ID" });
            }
            if (!friendRemove) {
                return res.status(404).json({ message: "No user with that ID" });
            }

            res.json(friendRemove);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}