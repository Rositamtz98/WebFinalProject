const mongoose = require('mongoose');
const {Schema} = mongoose;

const ActivitySchema = new Schema({
    course_id: {type: String, required: true},
    student_id: {type: String},
    value: {type: Number, default: 0},
    quiz: {type: Boolean, default: 0}
});

module.exports = mongoose.model('Activity', ActivitySchema);