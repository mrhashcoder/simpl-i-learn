const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    id : {
        type : String,
    },
    title : {
        type : String,
    },
    thumbnail : {
        type : String,
    },
    price : {
        type : Number,
    },
    videoLink : [{
        type : String,
    }]

});

module.exports = mongoose.model('Course' , courseSchema);
