const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,

    title:String,
    category: String,
    cover: String,
    author: {
        type: String,
        userId: String,
        name: String,
        designation: String,
        avatar: String,
        description: String,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },

    lastUpdatedOn: Date,
    content: String,
    
    views: Number,
    likes: Number,
    tags: Array,
    source: String,

    published: {
        type: Boolean,
        default: false
    },
    
    comments: [{
        type: String,
        userId: String,
        name: String,
        email: String,
        comment: String,
        date: Date,
        replies: {
            userId: String,
            comment: String,
            date: Date,
        }
    }]
})

module.exports = mongoose.model("Blog", blogSchema);