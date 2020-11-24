const mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;

require('mongoose-type-url');


const SubmissionSchema = new Schema({
    course_id: {type: String, required: true},
    student_id: {type: String, required: true},
    activity_id: {type: String, required: true},
    link: {type: SchemaTypes.Url, required: true},
    grade: {type: Number, default: 0},
});

module.exports = mongoose.model('Submission', SubmissionSchema);