const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Video', videoSchema);
