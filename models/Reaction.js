// this model is not used for a collection, but is an embedded sub-document for Thought
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        lastChange: {
            type: Date,
            default: Date.now,
            get: (d) => {
                d.toLocaleDateString('en-US');
            }
        }
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false
    }
);

module.exports = reactionSchema;