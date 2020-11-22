const mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;

require('mongoose-type-url');


const ActivitySchema = new Schema({
    course_id: {type: String, required: true},
    link: {type: SchemaTypes.Url, required: true},
    value: {type: Number, default: 0},
    quiz: {type: Boolean, default: 0}
});

module.exports = mongoose.model('Activity', ActivitySchema);