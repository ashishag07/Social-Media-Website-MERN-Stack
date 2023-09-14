const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        min : 3,
        max : 20,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        min: 6,
        required: true
    },
    profilePicture:{
        type: String,
        default: ''
    },
    coverPicture:{
        type: String,
        default: ''
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        max: 50,
        default:''
    },
    city:{
        type: String,
        max: 50,
        default:''
    },
    from:{
        type: String,
        max: 50,
        default:''
    },
    relationship:{
        type: Number,
        enum: [1,2,3],
        default:1
    }
},{timestamps: true}
)
module.exports = mongoose.model('User',UserSchema)