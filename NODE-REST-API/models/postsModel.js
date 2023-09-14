const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        max: 500,
        default: ''
    },
    img:{
        type: String,
        default: ''
    },
    likes:{
        type: Array,
        default: []
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Posts', postSchema);