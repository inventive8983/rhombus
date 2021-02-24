const express = require('express')
const router = express.Router()

//signup  route
const { signUp, signin, isSignedIn, signout, verifyToken, isAdmin, resetPassword, newPassword, update, changePassword} = require('../controllers/user') 
const {check} = require('express-validator')


const validate = [
    check("name", "Please enter a valid name").isLength({min: 3}),
    check("email", "Please enter a valid email").isEmail(),
    check("mobile", "Please enter a valid mobile number").isNumeric().isLength({max: 10}),
    check("address", "Address field is required").exists(),
    check("city", "Please enter a city").exists(),
    check("password", "Password is required").exists(),
    check("cnfrmPassword", "Please confirm your password").exists(),
    check("state", "Please enter a state").exists(),
    check("pincode", "Please enter a valid pincode").isNumeric().isLength(6),
]

const validateUser = [
    check("name", "Please enter a valid name").isLength({min: 3}),
    check("mobile", "Please enter a valid mobile number").isNumeric().isLength({max: 10}),
    check("addresses.*.street", "Address field is required").exists().isLength({min:2}),
    check("addresses.*.city", "Please enter a city").exists(),
    check("addresses.*.state", "Please enter a state").exists(),
    check("addresses.*.country", "Please enter a valid country").isAlpha(),
    check("addresses.*.pincode", "Please enter a valid pincode").isNumeric().isLength({min:4, max: 6}),
]

//signup
router.post('/signup', validate ,signUp)

router.post('/reset', resetPassword)

//signin 
router.post("/login",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
)

//singout 
router.get('/logout',isSignedIn, signout)

router.post('/update',isSignedIn, validateUser, update)

router.post('/password/change',isSignedIn, changePassword)

router.get('/password/new', newPassword)




module.exports = router