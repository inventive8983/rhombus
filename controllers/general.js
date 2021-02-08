const General = require('../models/general')
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

exports.updateContent = (req, res) => {
    General.updateOne({name: req.params.content}, { $set: {
        data: req.body.content
    }}).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err);
        res.sendStatus(400)
    })

}

exports.getContent = (req, res) => {
    General.findOne({name: req.params.content}).then(content => {
        res.send(content.data)
    }).catch(err => {
        res.sendStatus(400)
    })
}

exports.getImages = (req, res) => {
    //joining path of directory 
    const directoryPath = path.join(__dirname, `../media/${req.params.folder}`);
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        console.log(files);
        res.send(files)
    });
}

exports.deleteImage = (req, res) => {
    //joining path of directory 
    const directoryPath = path.join(__dirname, `../media/${req.params.folder}/${req.params.filename}`);
    //passsing directoryPath and callback function
    fs.unlink(directoryPath, function (err) {
        //handling error
        if (err) {
            return console.log('Unable to delete file');
        } 
        res.send("Deleted")
    });
}


