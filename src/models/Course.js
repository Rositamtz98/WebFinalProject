const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = new Schema({
    course_id: {type: String, required: true},
    subject: {type: String, required: true},
    teacher_id: {type: String, default: '0'}
});

module.exports = mongoose.model('Course', CourseSchema);