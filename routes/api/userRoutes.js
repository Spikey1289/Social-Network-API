const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    removeUser,
    addUserFriend,
    removeUserFriend
} = require('../../controllers/userController.js');

//adds a user
router.route('/').get(getUsers).post(addUser);

//updates a user
router.route('/:userId').get(getOneUser).put(updateUser);

//deletes a user
router.route('/:userId').get(getOneUser).delete(removeUser);

//adds a friend to a user
router.route('/friends/:userId').post(addUserFriend);

//removes a friend from a user
router.route('/friends/:userId').delete(removeUserFriend);

module.exports = router;