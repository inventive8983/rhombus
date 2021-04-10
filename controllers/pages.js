const Course = require('../models/course')
const General = require('../models/general')
const Blog = require('../models/blog')

exports.homepage = async (req, res) => {

    const courses = await Course.find({featured: true}).limit(3)
    var testimonials = await General.findOne({name: 'testimonials'})
    var slides = await General.findOne({name: 'slider'})    

    if(testimonials.data) testimonials = testimonials.data
    if(slides.data) slides = slides.data

    res.render('homepage', {
        ...req.pageData,
        featured: courses,
        testimonials: testimonials,
        slides: slides
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

    Course.find({status:"Published", category: req.params.category}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1, subCategory: 1, category: 1}).then(courses => {
        if(courses.length !== 0){   

            var subCategories = []

            courses.forEach((course, index) => {  

                if(!course.subCategory) courses[index].subCategory = "Others"
                else if(!subCategories.includes(course.subCategory)) subCategories.push(course.subCategory)

                console.log(course.subCategory, index);
                    
            });

            res.render(`${req.params.category}`, {
                courses,
                category: req.params.category,
                subCategories,
                ...req.pageData
            })
        }
        else{
            res.render('status-page', {
                ...req.pageData,
                icon: 'coming-soon',
                title: req.params.category + " Courses are coming soon.",
                info: "We are currently preparing something excellent in our studio. Stay tuned."
            })
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
        images:[
          ["AKN Photos", "https://imagizer.imageshack.com/img924/7703/vzPz3r.jpg,https://imagizer.imageshack.com/img922/6654/Z30kyA.jpg,https://imagizer.imageshack.com/img924/1322/w9bWcH.jpg,https://imagizer.imageshack.com/img923/3676/anjLkF.jpg,https://imagizer.imageshack.com/img923/732/AOXqfc.jpg,https://imagizer.imageshack.com/img923/6031/9C4yVS.jpg,https://imagizer.imageshack.com/img922/9154/OfgtQ5.jpg,https://imagizer.imageshack.com/img923/1091/PcDrwY.jpg,https://imagizer.imageshack.com/img924/5923/WVeWtZ.jpg,https://imagizer.imageshack.com/img922/3269/V7QCNj.jpg,https://imagizer.imageshack.com/img924/1160/Pq1UTe.jpg,https://imagizer.imageshack.com/img923/3881/8BK517.jpg,https://imagizer.imageshack.com/img924/972/k6V2Ek.jpg"],
          ["Classroom Photos", "https://imagizer.imageshack.com/img922/3108/pQvOZ4.jpg,https://imagizer.imageshack.com/img923/1772/HxGwqy.jpg,https://imagizer.imageshack.com/img922/6386/J105oc.jpg,https://imagizer.imageshack.com/img923/6044/nNg8hZ.jpg,https://imagizer.imageshack.com/img924/1697/fGq83k.jpg,https://imagizer.imageshack.com/img923/5146/WlCm2L.jpg,https://imagizer.imageshack.com/img923/2118/qOynAU.jpg,https://imagizer.imageshack.com/img922/6113/9cPeXC.jpg,https://imagizer.imageshack.com/img924/5299/oEtBwD.jpg,https://imagizer.imageshack.com/img923/1053/fP6s5M.jpg,https://imagizer.imageshack.com/img922/8656/0ATJ88.jpg,https://imagizer.imageshack.com/img922/7213/zTIiSf.jpg,https://imagizer.imageshack.com/img923/4183/qSwuGr.jpg,https://imagizer.imageshack.com/img923/8342/Zdvml3.jpg,https://imagizer.imageshack.com/img923/3065/MjmgGT.jpg"],
          ["Feedbacks", "https://imagizer.imageshack.com/img924/4883/F9H78E.jpg,https://imagizer.imageshack.com/img924/7293/ndMCAJ.jpg,https://imagizer.imageshack.com/img924/8802/v84fH8.jpg,https://imagizer.imageshack.com/img923/1790/a31KsQ.jpg,https://imagizer.imageshack.com/img923/5062/J0CC0M.jpg"]
        ]
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

    const blog = await Blog.findOne({_id: req.params.id}, {content: 1})
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