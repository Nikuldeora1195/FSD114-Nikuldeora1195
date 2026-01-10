const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const {
  createCourse,
  getCourses,
  publishCourse
} = require("../controllers/course.controller");

// Get all published courses (Student + Teacher + Admin)
router.get(
  "/",
  protect,
  authorizeRoles("student", "teacher", "admin"),
  getCourses
);

// Teacher creates course
router.post(
  "/",
  protect,
  authorizeRoles("teacher"),
  createCourse
);

// Publish course
router.put(
  "/:id/publish",
  protect,
  authorizeRoles("teacher"),
  publishCourse
);




module.exports = router;
