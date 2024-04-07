const connection = require('../config/connection');
const {User, Thought} = require('../models');
const { getUserLength, getUsernameEmail, getThoughtText, getReactionBody } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({ name: 'users'}).toArray();
    if(userCheck.length){
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if(thoughtCheck.length){
        await connection.dropCollection('thoughts');
    }

    // creates the users collection, without friends or thoughts
    await setUserObjects();
    // creates the thoughts collection, and updates users with the thoughts that they 'created' based on the 'usernames' key/value pair in thoughts
    await setThoughtObjects();
    const reactions = [];
});
// sets the username and email for the users array of objects
const setUserObjects = async () => {
    for (let i = 0; i < getUserLength(); i++) { //define in data
        let userNameEmail = getUsernameEmail(i); //define in data
        let userData = {
            username: userNameEmail[0],
            email: userNameEmail[1],
        };
        let newUser = new User(userData)
        await newUser.save();
    }
    await setUserFriends();
}

const setUserFriends = async () => {
    for await (const user of User.find()){
        idArray = [];
        let userFriends = await user.friends;
        for await (const user2 of User.find()) {
            if (user._id !== user2._id) {
                await idArray.push(await user2._id);
            }
        }
        for (let i = 0; i < idArray.length; i++){
            let hasFriend = (Math.random());
            if(hasFriend > 0.5){
                await userFriends.push(idArray[i]);
            }
        }
        await user.save();
    }
}

const setThoughtObjects = async () => {
    let thoughtCounter = 0;
    let reactionCounter = 0
    for await (const user of User.find()) {
        let randomThoughtsNum = (Math.floor(Math.random() * 3));
        for (let x = 0; x < randomThoughtsNum; x++) {
            let thoughtText = getThoughtText(thoughtCounter); //define in data
            let thoughtUsername = user.username;
            let reactions = [];
            let thoughtData = {
                thoughtText,
                username: thoughtUsername,
                reactions,
            }
            let newThought = new Thought(thoughtData);
            await setThoughtReactions(await newThought.reactions, reactionCounter);
            await newThought.save();

            const userThoughtSetID = await User.findOne({ username: user.username });
            userThoughtSetID.thoughts.push(newThought._id);
            userThoughtSetID.save();
            thoughtCounter++;
        }
    }
}

const setThoughtReactions = async (array, reactionCounter) => {
    let nameArray = []
    for await (const user of User.find()) {
        await nameArray.push(await user.username);
    }
    // random number of reactions per thought
    let randomReactions = (Math.floor(Math.random() * 3));

    // gets the reaction data
    for (let i = 0; i < randomReactions; i++) {
        // chooses a random index for the username
        let userChooser = (Math.floor(Math.random() * (await nameArray.length)))
        let reactionBody = getReactionBody(i);
        let reactionUsername = await nameArray[userChooser];
        let reactionData = {
            reactionBody,
            username: reactionUsername,
        }

        array.push(reactionData);
        reactionCounter++;
    }
}