const mongoose = require('mongoose');
const formidable = require('formidable');
const grid = require('gridfs-stream');
const fs = require('fs');
const util = require('util');
require('mongoose-type-url');
const {Schema, SchemaTypes} = mongoose;

const HomeworkSchema = new Schema({
    homework_id: {type: String, required: true},
    link: {type: SchemaTypes.Url, required: true},
    img: 
    { 
        data: Buffer, 
        contentType: String 
    }, 
    subject: {type: String, required: true},
    teacher_id: {type: String, default: '0'}
});

module.exports = mongoose.model('Homework', HomeworkSchema);