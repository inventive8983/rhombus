const express = require('express')
const router = express.Router()

const { addCourse, getAllCourses, getCourse, deleteCourse, changeStatus, addToCart, getCourseCover, duplicate } = require("../controllers/course");

router.post('/add', addCourse)

router.get('/duplicate/:id', duplicate)

router.get('/all', getAllCourses)

router.get('/:id', getCourse)

router.get('/cover/:id', getCourseCover)

router.post('/addtocart', addToCart)

router.get('/status/:id/:status', changeStatus)

router.delete('/delete/:id', deleteCourse)


module.exports = router