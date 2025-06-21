const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get all videos
router.get('/', async (req, res) => {
  const videos = await Video.find().populate('course', 'title');
  res.send(videos);
});

// Get video by ID
router.get('/:id', async (req, res) => {
  const video = await Video.findById(req.params.id).populate('course', 'title');
  if (!video) return res.status(404).send('Video not found');
  res.send(video);
});

module.exports = router;
