const express = require('express')
const router = express.Router()

const { addCourse, getAllCourses, getCourse, deleteCourse, changeStatus, addToCart, getCourseCover, duplicate, watchDemo } = require("../controllers/course");
const {isAdmin} = require('../controllers/admin')

router.post('/add', isAdmin, addCourse)

router.get('/duplicate/:id',isAdmin, duplicate)

router.get('/all', isAdmin, getAllCourses)

router.get('/:id', isAdmin, getCourse)

router.get('/cover/:id', getCourseCover)

router.post('/addtocart', addToCart)

router.get('/status/:id/:status', isAdmin, changeStatus)

router.post('/watchdemo', watchDemo)


router.delete('/delete/:id', isAdmin, deleteCourse)


module.exports = router