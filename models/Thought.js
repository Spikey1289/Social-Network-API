const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        }, 
        lastChange: {
            type: Date,
            default: Date.now,
            get: (d) => {
                d.toLocaleDateString('en-US');
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;