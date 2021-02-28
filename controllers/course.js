const mongoose = require('mongoose')
const Course = require('../models/course')
const formidable = require('formidable');
var fs = require('fs');
const Customers = require('../models/customers');

exports.addCourse = async (req, res) => {

    //Aligning Sections
    var sections = []
    req.body.sections.forEach((section,index) => {
        sections.push({
            name: section,
            lessons: req.body.data[`lessongroup-${index + 1}`]
        })
    });

    const courseExist = await Course.findOne({_id:req.body.id})

    if (courseExist){

        req.body.data.subCategory = req.body.data.subCategory[0]

        Course.updateOne({_id: req.body.id}, {$set: {
            ...req.body.data, sections, cover: req.body.coverImg
        }}).then(result => {
            console.log(result)
                res.send(result)
            })   
            .catch(err =>{
            console.log("Catch")
            res.json({
                message: err
            })
        })
    }
    else{
        const newCourse = new Course ({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.data.name,
            description: req.body.data.description,
            totalLectures: req.body.data.totalLectures,
            duration: req.body.data.duration,
            period: req.body.data.period,
            videoLanguage: req.body.data.videoLanguage,
            studyLanguage: req.body.data.studyLanguage,
            category: req.body.data.category,
            subCategory: req.body.data.subCategory[0],
            tags: req.body.data.tags,
            demoVideos: req.body.data.demoVideos,
            driveLink: req.body.data.driveLink,
            variants: req.body.data.variants,
            addons: req.body.data.addons,
            cover: req.body.coverImg,
            sections,
        })     
    
        await newCourse.save().then(result => {
                res.status(200).send(result)
            })   
            .catch(err =>{
            console.log(err)
            res.status(400).json({
                message: err
            })
        })
    }
    
    
    
}

exports.duplicate = async(req, res) => {

    const course = await Course.findOne({_id: req.params.id})
    if(!course) return res.status(400).send("Bad request")

    const newCourse = new Course ({
        _id: new mongoose.Types.ObjectId(),
        name: course.name,
        description: course.description,
        totalLectures: course.totalLectures,
        duration: course.duration,
        period: course.period,
        videoLanguage: course.videoLanguage,
        studyLanguage: course.studyLanguage,
        category: course.category,
        subCategory: course.subCategory,
        tags: course.tags,
        demoVideos: course.demoVideos,
        driveLink: course.driveLink,
        variants: course.variants,
        addons: course.addons,
        cover: course.cover,
        sections: course.sections,
    }) 
    
    await newCourse.save().then(result => {
        res.status(200).send(result)
    })   
    .catch(err =>{
        console.log(err)
        res.status(400).json({
            message: err
        })
    })

}

exports.getAllCourses = async (req, res) => {
    await Course.find({}, {name:1,description:1,duration:1, variants:1, videoLanguage:1, category:1, status:1})
    .then(courses => {
        res.send(courses)
    })
}

exports.getCourse = async (req, res) => {
    await Course.findOne({_id: req.params.id})
    .then(course => {
        res.status(200).send(course)
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.getCourseCover = async (req, res) => {
    Course.findOne({_id: req.params.id}, {cover: 1})
    .then(course => {
        const im = course.cover.split(",")[1];

        const img = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
        });

        res.end(img);
        
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.changeStatus = async (req, res) => {


    const status = req.params.status === "Published" ? "Unpublished" : "Published"

    await Course.updateOne(
        {
            _id: req.params.id
        },
        {
            status: status 
        }
    ).then(result => {
        res.status(200).send({
            result, 
            status
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.addToCart = (req, res) => {

        const fields = req.body

        Course.findOne({_id: fields.id}, {name: 1, variants: 1,addons: 1}).then(course => {
            var price = course.variants[fields.variant].discountPrice
            var details = [course.variants[fields.variant].name, fields.streamSrc]
            course.addons.forEach(addon => {
                if(fields.streamSrc === addon.name) {
                    price += addon.price
                }
            })
            
            const cartItem = {
                id: fields.id,
                product: "Course",
                name: course.name,
                amount: price,
                details
            }


            try{
                req.session.cart.push(cartItem)
            }
            catch(e){
                req.session.cart = [cartItem]
            }          
            req.session.message = {
                type: "success",
                content: "Added to cart successfully."
            }
            res.redirect(`/course/${fields.id}`)

        }).catch(err => {
            console.log(err);
            res.status(400).send(err)
        })

}

exports.deleteCourse = async (req, res) => {
    await Course.deleteOne({_id: req.params.id})
    .then(course => {
        res.status(200).send(course)
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}


exports.watchDemo = async (req, res) => {

    console.log(req.body);

    const newCust = new Customers({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        mobile: req.body.mobile,
        city: req.body.city
    })

    newCust.save().then(result => {
        res.send({
            customer: result,
            message: "You can watch now."
        })
    })

}