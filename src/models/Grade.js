const mongoose = require('mongoose');
const {Schema} = mongoose;

const GradeSchema = new Schema({
    course_id: {type: String, required: true},
    subject: {type: String, required: true},
    student_id: {type: String, required: true},
    grade_id: {type: Number, required: true},
    value: {type: Number, default: 0}
});

module.exports = mongoose.model('Grade', GradeSchema);