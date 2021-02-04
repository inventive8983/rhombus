const mongoose = require('mongoose')
const Course = require('../models/course')
const fs = require('fs')
const path = require('path')
const testimonials = require('../testimonials.json')
const categories = ['CA', 'UGC-NET', 'MBA', 'Junior']

exports.homepage = (req, res) => {

    Course.find({featured: true}).limit(3).then(courses => {
        
        //joining path of directory 
        const directoryPath = path.join(__dirname, `../media/covers`);
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            res.render('homepage', {
                ...req.pageData,
                testimonials,
                featured: courses,
                slides: files
            })
        
        });
        
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
    Course.find({status:"Published"}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1}).then(courses => {
        var organized = {}
        courses.forEach(course => {
            if(organized[course.category]){
                organized[course.category].push(course)                
            }
            else{
                organized[course.category] = []
                organized[course.category].push(course)                
            }
        });
        res.render('courses', {
            courses: organized,
            categories,
            ...req.pageData
        })
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

    //joining path of directory 
    const directoryPath = path.join(__dirname, `../media/gallery`);
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        res.render('gallery', {
            ...req.pageData,
            files
        })
    });

    
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
