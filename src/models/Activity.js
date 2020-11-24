const mongoose = require('mongoose');
const {Schema, SchemaTypes} = mongoose;



const ActivitySchema = new Schema({
    title: ({type: String, required: true}),
    course_id: {type: String, required: true},
    link: {type: Schema.Types.ObjectId, required: true},
    quiz: {type: Boolean, default: 0}
});

module.exports = mongoose.model('Activity', ActivitySchema);