const {User, Thought} = require('../models');

module.exports = {
    //Gets all the users in the User collection
    async getUsers(req, res){
        try {
            const allUsers = await User.find().select("-__v");

            res.json({allUsers});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //gets the user with the designated ID
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

    //adds a user to the User collection, getting the info from a JSON body
    async addUser(req, res) {
        try{
            const newUser = await User.create(req.body);
            res.json({newUser});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //updates the user at the designated ID with a JSON body
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

    //deletes the user with the designated ID from the collection
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

    //adds a userID to the friends array for the designated user
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

            return res.json(friendAdd);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //deletes a userID to the friends array for the designated user
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

            return res.json(friendRemove);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}