const mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;


const SubmissionSchema = new Schema({
    course_id: {type: String, required: true},
    student_id: {type: String, required: true},
    activity_id: {type: String, required: true},
    link: {type: Schema.Types.ObjectId, required: true},
    grade: {type: Number, default: 0},
});

module.exports = mongoose.model('Submission', SubmissionSchema);