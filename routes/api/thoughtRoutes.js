const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController.js');

//adds thoughts
router.route('/').get(getThoughts).post(addThought);

//updates thoughts
router.route('/:thoughtId').get(getOneThought).put(updateThought);

//deletes thoughts
router.route('/:thoughtId').get(getOneThought).delete(removeThought);

//adds a reaction to a thought
router.route('/reactions/:thoughtId').post(addReaction);

//deletes a reaction from a thought
router.route('/reactions/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;