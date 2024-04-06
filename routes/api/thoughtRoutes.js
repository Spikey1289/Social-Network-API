const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    updateReaction,
    removeReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(addThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought);

router.route('/:thoughtId').get(getOneThought).delete(removeThought);

// router.route('/:thoughtId/reactions').post(addReaction);

// router.route('/:thoughtId/reactions/:reactionId').put(updateReaction);

// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;