const Course = require('../models/course')
const General = require('../models/general')
const Blog = require('../models/blog')

exports.homepage = async (req, res) => {

    const courses = await Course.find({featured: true}).limit(3)
    const testimonials = await General.findOne({name: 'testimonials'})
    const slides = await General.findOne({name: 'slider'})    

    res.render('homepage', {
        ...req.pageData,
        featured: courses,
        testimonials: testimonials?.data || [],
        slides: slides?.data || []
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

    Course.find({status:"Published", category: req.params.category}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1, subCategory: 1}).then(courses => {
        if(courses.length !== 0){   

            var subCategories = []

            courses.forEach((course, index) => {  

                if(!course.subCategory) courses[index].subCategory = "Others"
                else if(!subCategories.includes(course.subCategory)) subCategories.push(course.subCategory)

                console.log(course.subCategory, index);
                    
            });

            res.render('courses', {
                courses,
                category: req.params.category,
                subCategories,
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

        if(!course.demoVideos) course.demoVideos = []

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
exports.results = async (req, res) => {

    const results = await General.findOne({name: 'results'})    

    res.render('results', {
        ...req.pageData,
        files: results.data
    })
    
}

exports.blogs = async (req, res) => {

    const blogs = await Blog.find({published: true}, {_id: 1, title: 1, category: 1, cover: 1, createdOn: 1})

    res.render('blogs', {
        blogs,
        ...req.pageData
    })
}

exports.blogDetails = async (req, res) => {

    const blog = await Blog.findOne({_id: req.params.id, published: true}, {_id: 1, title: 1, category: 1, cover: 1, lastUpdatedOn: 1})
    if(!blog) return res.sendStatus(404)
    res.render('blog-details', {
        blog,
        ...req.pageData
    })
}

exports.blogContent = async (req, res) => {

    const blog = await Blog.findOne({_id: req.params.id, published: true}, {content: 1})
    if(!blog) return res.sendStatus(404)
    res.status(200).json({content: blog.content})

}


exports.login = async (req, res) => {
    if(req.isAuthenticated()){
        res.render('status-page', {
            icon: "error",
            title: "You are already logged in",
            info: "",
            ...req.pageData
        })
    }
    else{
        res.render('login', {
            ...req.pageData
        })
    }
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
        total = 0
    }

    res.render('checkout', {
        total,
        ...req.pageData
    })
    
}


//Dashboard
exports.dashboard = (req, res) => {
    res.render('dashboard/home', {...req.pageData})
}

exports.basicInfo = (req, res) => {
    res.render('dashboard/basicinfo', {...req.pageData})
}

exports.paymentInfo = (req, res) => {
    res.render('dashboard/paymentinfo', {...req.pageData})
}

exports.paymentHistory = (req, res) => {
    res.render('dashboard/paymenthistory', {...req.pageData})
}