const fundamentals = require('../fundamentals.json')
const testimonials = require('../testimonials.json')
const path = require('path');
const fs = require('fs');


exports.updateContent = (req, res) => {

    var values = {}
    req.body.fundamentals.forEach(value => {
        values[value.name] = value.description
    })
    fs.writeFile('./fundamentals.json', JSON.stringify(values), err => {
        
        if(err) return res.sendStatus(400);
        res.sendStatus(200)

    })        

}

exports.updateTestimonials = (req, res) => {

    var values = req.body.testimonials
    fs.writeFile('./testimonials.json', JSON.stringify(values), err => {
        
        if(err) return res.sendStatus(400);
        res.sendStatus(200)

    })        

}

exports.getContent = (req, res) => {res.send(fundamentals)}

exports.getTestimonials = (req, res) => {res.send(testimonials)}

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


