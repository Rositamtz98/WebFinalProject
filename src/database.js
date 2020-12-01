const mongoose = require('mongoose');
const uri = "mongodb+srv://Sergon:blue@cluster0.ugamq.mongodb.net/proyecto-final?retryWrites=true&w=majority"

mongoose.connect('mongodb://localhost/proyecto-final', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
    .catch(err => console.error(err));