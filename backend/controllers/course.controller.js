const Course = require("../models/Course");

// Teacher creates a course
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all published courses (student view)
const getCourses = async (req, res)=> {
  try {
  const courses = await Course.find({ isPublished:true })
  .populate("createdBy", "name email");

  res.json(courses);

  } catch (error){
    res.status(500).json({ message: error.message });
  }
};


// Publish a course (Teacher only)
const publishCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if this teacher owns the course
    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to publish this course" });
    }

    // Publish the course
    course.isPublished = true;
    await course.save();

    res.json({ message: "Course published successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { createCourse, getCourses , publishCourse };
