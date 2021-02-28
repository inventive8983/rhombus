const mongoose = require('mongoose')

//schema
const courseSchema = new mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    videoLanguage: {
        type: Array,
        required: true
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    },
    studyLanguage: {
        type: Array,
        required: true
    },
    totalLectures:{
        type: Number,
        required: true,
    },
    period: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    tags:[{
        type: String,
    }],
    demoVideo: String,
    demoVideos: [{
        name: String,
        link: String
    }],
    driveLink:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    },
    sections: [{
        name: String,
        lessons:[{
            name: String,
            duration: Number
        }]
    }],
    status: {
        type: String,
        default: "Unpublished"
    },
    variants: [{
        name: String,
        description: String,
        price: Number,
        discountPrice: Number
    }],
    addons: [{
        name: String,
        description: String,
        price: Number,
        img: String,
    }]
},{timestamps:true})

module.exports = mongoose.model("Course", courseSchema)