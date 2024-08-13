const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
       },

    movieId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
     },
    
  
    rating:{
       type: Number,
       required: true, 
       min: 1,
       max: 5 
      },
      
    review: { 
      type: String,
      required: true 
    },
  
    createdAt: { 
      type: Date, 
      default: Date.now 
     },
     
  
  },{timestamps: true});

  module.exports =  mongoose.model('Review', reviewSchema);