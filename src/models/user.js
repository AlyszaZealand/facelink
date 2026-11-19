const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   posts: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Post'
   }]
});

// Posts
// Brugerens posts vil blive gemt som en relation
// I form af referencer til Post-dokumenter

module.exports = mongoose.model('User', userSchema, 'userdb');
