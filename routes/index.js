const  userRoutes = require('./user')
const  feedBackRoutes = require('./feedback')
const  reportRoutes = require('./report')
const  contactRoutes = require('./contact')
const  pagesRoutes = require('./pages')
const  cartRoutes = require('./cart')
const  paymentRoutes = require('./payments')
const  uploadRoutes = require('./upload')
const  generalRoutes = require('./general')
const  fundamentals = require('../fundamentals.json')

//Products
const  courseRoutes = require('./course')


const express =require('express')
const router = express.Router()


router.use("/", (req, res, next) => {

    req.pageData = {
        fundamentals,
        cart: req.session.cart || [],
        message: req.session.message,

    }
    req.session.message = false
    next()

}, pagesRoutes)

router.use("/api/user", userRoutes)
router.use("/api/feedback", feedBackRoutes)
router.use("/api/contact", contactRoutes)
router.use("/api/report", reportRoutes)
router.use("/api/cart", cartRoutes)
router.use("/api/payment", paymentRoutes)
router.use("/api/upload", uploadRoutes)
router.use("/api/general", generalRoutes)

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