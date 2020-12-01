const mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;

require('mongoose-type-url');


const ActivitySchema = new Schema({
    title: ({type: String, required: true}),
    course_id: {type: String, required: true},
    link: {type: SchemaTypes.Url, required: true},
    quiz: {type: Boolean, default: 0}
});

module.exports = mongoose.model('Activity', ActivitySchema);