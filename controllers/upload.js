const formidable = require('formidable')
const fs = require('fs')
const multer  = require('multer');


exports.uploadImage = (req, res) => {
    
    try {

        console.log(req.body);
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }

}