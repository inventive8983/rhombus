const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    const user = await Admin.findOne({email: req.body.email})
    if(!user) return res.status(400).send("User does not exist.")

    const password = req.body.password
    if(password !== user.password) return res.status(400).send("Wrong Password.")

    const token =  await jwt.sign({data: user}, 'my-secret', {expiresIn: '1h'})
    res.status(200).send(token)

}

exports.user = async (req, res) => {
    
    jwt.verify(req.body.token, 'my-secret', async (err, decoded) => {
        if(err) res.status(400).send("Some error occured")
        else {
            
            const user = await Admin.findOne({_id: decoded.data._id})
            if(!user) return res.status(400).send("User does not exist.")
            
            res.status(200).send(decoded.data)
        }
    })

}

exports.isAdmin = async (req, res, next) => {

    jwt.verify(req.headers.authorization, 'my-secret', async (err, decoded) => {
        if(err) res.status(401).send("You are not admin")
        else {
            
            const user = await Admin.findOne({_id: decoded.data._id})
            if(!user) return res.status(400).send("User does not exist.")
            
            next()
        }
    })

}

