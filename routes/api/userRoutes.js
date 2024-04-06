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

router.route('/').get(getUsers).post(addUser);

router.route('/:userId').get(getOneUser).put(updateUser);

router.route('/:userId').get(getOneUser).delete(removeUser);

router.route('/friends/:userId').post(addUserFriend);

router.route('/friends/:userId').delete(removeUserFriend);

module.exports = router;