const express = require('express')
const router = express.Router()

//signup  route
const { signUp, signin, isSignedIn, signout, resetPassword, newPassword, update, changePassword, downloadCustomers, resetPasswordFromOTP} = require('../controllers/user') 
const {check} = require('express-validator')
const { isAdmin } = require('../controllers/admin')


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
    check("addresses.*.street", "Address field is required").exists().isLength({min:2}),
    check("addresses.*.city", "Please enter a city").exists(),
    check("addresses.*.state", "Please enter a state").exists(),
    check("addresses.*.country", "Please enter a valid country").isAlpha(),
    check("addresses.*.pincode", "Please enter a valid pincode").isNumeric().isLength({min:4, max: 6}),
]

//signup
router.post('/signup', validate ,signUp)

router.post('/reset', resetPassword)

router.post('/resetWithOTP',[
    check("mobile", "Please enter a valid mobile number").isNumeric().isLength({max: 10}), 
    check("password1", "Password is required").exists(),
    check("password2", "Password is required").exists(),
    check("code", "Please enter a valid OTP").isNumeric().isLength(4)
], resetPasswordFromOTP)

//signin 
router.post("/login",
    [
      check("mobile", "Mobile is required").isNumeric().isLength({max:10}),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
)

//singout 
router.get('/logout',isSignedIn, signout)

router.post('/update',isSignedIn, validateUser, update)

router.post('/password/change',isSignedIn, changePassword)

router.get('/password/new', newPassword)

router.get('/download/customers', isAdmin, downloadCustomers)




module.exports = router