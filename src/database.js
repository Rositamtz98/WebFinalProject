const mongoose = require('mongoose');
const uri = "mongodb+srv://Sergon:spiderman99@cluster0.ugamq.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(uri || 'mongodb://localhost/proyecto-final', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
    .catch(err => console.error(err));