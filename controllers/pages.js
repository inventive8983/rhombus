const mongoose = require('mongoose')
const Course = require('../models/course')
const General = require('../models/general')
const fs = require('fs')
const path = require('path')
const categories = ['CA', 'UGC-NET', 'MBA', 'Junior']

exports.homepage = async (req, res) => {

    const courses = await Course.find({featured: true}).limit(3)
    const testimonials = await General.findOne({name: 'testimonials'})
    const slides = await General.findOne({name: 'slider'})    

    res.render('homepage', {
        ...req.pageData,
        featured: courses,
        testimonials: testimonials.data,
        slides: slides.data
    })
}

exports.about = async (req, res) => {
    res.render('about', {
        ...req.pageData
    })
}

exports.contact = async (req, res) => {
    res.render('contact', {
        ...req.pageData
    })
}

exports.allCourses = async (req, res) => {
    Course.find({status:"Published", category: req.params.category}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1}).then(courses => {
        if(courses.length !== 0){
            res.render('courses', {
                courses,
                category: req.params.category,
                ...req.pageData
            })
        }
        else{
            res.sendStatus(404)
        }
    })
    
}

exports.course = async (req, res) => {

    try{

        const course = await Course.findOne({_id: req.params.id})
        if(!course) return res.sendStatus(404)

        var relatedCourses = await Course.find({category: course.category}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1}).limit(3)
        res.render('course-details', {
            course,
            relatedCourses,
            ...req.pageData
        })

    }catch(e){
        console.log(e);
        return res.sendStatus(404)
    }
    
}

exports.gallery = async (req, res) => {

    const gallery = await General.findOne({name: 'gallery'})    

    res.render('gallery', {
        ...req.pageData,
        files: gallery.data
    })
    
}

exports.blogs = async (req, res) => {
    res.render('blogs', {
        ...req.pageData
    })
}

exports.blogDetails = async (req, res) => {
    res.render('blog-details', {
        ...req.pageData
    })
}

exports.login = async (req, res) => {
    res.render('login', {
        ...req.pageData
    })
}

exports.signup = async (req, res) => {
    res.render('signup', {
        ...req.pageData
    })
}

exports.resetPassword = async (req, res) => {
    res.render('reset-password', {
        ...req.pageData
    })
}


exports.checkout = async (req, res) => {

    var total = 0
    try{
        req.session.cart.map(item => { total += item.amount })
    }
    catch(e){
        
    }

    res.render('checkout', {
        total,
        ...req.pageData
    })

    
}
