const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
     type: String,
     required: true 
    },

    image: {
     type: String,
     required: true
    },

    overview: { 
     type: String, 
     required: true 
    }, 

});



module.exports =  mongoose.model('Movie', movieSchema);