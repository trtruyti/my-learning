const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Video = require('../models/Video');

// Create course (protected)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const course = new Course({
    title,
    description,
    instructor: req.user._id
  });
  await course.save();
  res.send(course);
});

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('instructor', 'username email').populate('videos');
  res.send(courses);
});

// Add video to course (protected)
router.post('/:courseId/addVideo', auth, async (req, res) => {
  const { title, url } = req.body;
  const { courseId } = req.params;
  const video = new Video({ title, url, course: courseId });
  await video.save();
  const course = await Course.findById(courseId);
  course.videos.push(video._id);
  await course.save();
  res.send(video);
});

module.exports = router;
