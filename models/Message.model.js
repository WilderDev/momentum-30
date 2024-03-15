// * IMPORTS * //
const {mongoose, Types} = require("mongoose");
const Schema = mongoose.Schema;

// * MODEL * //
const messageModel = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    author: {
        role: {
            type: String,
            enum: ['user', 'bot'],
        },
        name: {
            type: String,
        },
        pic: {
            type: String,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// * EXPORTS * //
module.exports = mongoose.model('Message', messageModel)