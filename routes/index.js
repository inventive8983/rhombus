const  userRoutes = require('./user')
const  feedBackRoutes = require('./feedback')
const  reportRoutes = require('./report')
const  contactRoutes = require('./contact')
const  pagesRoutes = require('./pages')
const  cartRoutes = require('./cart')
const  paymentRoutes = require('./payments')
const  blogRoutes = require('./blog')
const  uploadRoutes = require('./upload')
const  generalRoutes = require('./general')
const  adminRoutes = require('./admin')

const User = require('../models/user')

//Products
const  courseRoutes = require('./course')

const General = require('../models/general')
const express =require('express')
const router = express.Router()


const commonData = async (req, res, next) => {

    const content = await General.findOne({name: 'fundamentals'})
    var fundamentals = {}
    content.data.forEach(item => {
        fundamentals[item.name] = item.description
    })
    req.pageData = {
        cart: req.session.cart || [],
        message: req.session.message,
        fundamentals,
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? await User.findById(req.session.passport.user) : {}
    }
    req.session.message = false
    next()

}

router.use("/", commonData, pagesRoutes)
router.use("/payment", paymentRoutes)

router.use("/api/user", userRoutes)
router.use("/api/feedback", feedBackRoutes)
router.use("/api/contact", contactRoutes)
router.use("/api/report", reportRoutes)
router.use("/api/cart", cartRoutes)
router.use("/api/blogs", blogRoutes)
router.use("/api/upload", uploadRoutes)
router.use("/api/general", generalRoutes)
router.use("/api/admin", adminRoutes)

//Products
router.use("/api/course", courseRoutes)

const errorMessage = {
    pageNotFound: 'Page Not Found'
}

//handling error 404 (Not Found)
router.use((req, res, next) => {
  
    const error = new Error(errorMessage.pageNotFound);
    error.status = 404;
    res.render('status-page', {
        icon: "404",
        title: "404 Page Not Found",
        info: "We don't know what you were looking for. Let's start over.",
        ...req.pageData
    })
});
    
module.exports = router