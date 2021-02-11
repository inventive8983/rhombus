const { Types } = require('mongoose');
const Blog = require('../models/blog')

exports.getBlogs = (req, res) => {
    Blog.find({}).then(blogs => {
        res.send(blogs)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
}

exports.viewBlog = (req, res) => {
    Blog.findOne({_id: req.params.id}).then(blog => {
        res.send(blog)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
}

exports.addBlog = (req, res) => {
    
    const newBlog = new Blog({
        _id: new Types.ObjectId(),
        title: req.body.title,
        category: "General",
        cover: req.body.cover
    })

    newBlog.save().then(blog => {
        res.send(blog)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
}

exports.updateBlog = (req, res) => {

    const blog = req.body
    
    Blog.updateOne({_id: req.params.id}, { $set: {
        ...blog,
        lastUpdatedOn: Date.now()
    }}).then(result => {
        if(result.nModified === 1) res.sendStatus(200)
        if(result.nModified === 0) res.sendStatus(204)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })

}

exports.publishBlog = (req, res) => {

    Blog.updateOne({_id: req.params.id}, { $set: {
        published: req.body.status
    }}).then(result => {
        if(result.nModified === 1) res.sendStatus(200)
        if(result.nModified === 0) res.sendStatus(204)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })

}


exports.deleteBlog = (req, res) => {

    Blog.deleteOne({_id: req.params.id}).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })

}