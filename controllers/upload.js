const formidable = require('formidable')
const fs = require('fs')
const multer  = require('multer');
const compress_images = require("compress-images")


exports.uploadImage = (req, res) => {

    try {

        console.log(req.file);
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }

}