const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('../models/User');
const Activity = require('../models/Activity');

const CourseSchema = new Schema({
    course_id: {type: String, required: true},
    subject: {type: String, required: true},
    teacher_id: {type: String, default: '0'},
    students: [{ student: {type: Schema.Types.ObjectId, ref: 'User'} }],
    activities: [{activity: {type: Schema.Types.ObjectId, ref: 'Activity'}}]
});

module.exports = mongoose.model('Course', CourseSchema);