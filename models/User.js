const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/236x/48/07/43/4807437150542c4c980d358291aea33d.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    moviesWatched: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    moviesBookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
}, {timestamps: true})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel