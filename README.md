🎓 EduVillage – Online Learning Platform

EduVillage is a full-stack Online Learning Management System (LMS) built using the MERN stack.
It supports role-based access, structured course content, student enrollment, and progress tracking — inspired by real-world platforms like Coursera and Udemy.

🚀 Live Project Status

Stage: Active Development
Frontend: Integrated
Backend: Stable
Authentication: JWT + Role-Based Access
Content Module: Implemented
UI: Modern, Coursera-style design (Student Learning Flow completed)

🛠 Tech Stack
Frontend

React (Vite)

React Router DOM

Tailwind CSS

Axios

Context API (Auth)

React Hot Toast

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

👥 User Roles

Student

Teacher

Admin (future scope)

Each role has restricted access to features using middleware and protected routes.

🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (RBAC)

Protected frontend routes

Backend middleware validation

📚 Core Features
👩‍🎓 Student Features

Register & login

Browse published courses

Enroll in courses

View enrolled courses (My Learning)

Track course progress

Continue learning from course content

View announcements

👨‍🏫 Teacher Features

Create courses

Edit course details (title & description)

Manage course content (sections & lessons)

Add lessons with text and optional image URL

Create announcements

View own courses

🧩 Course Content

Courses contain Sections

Sections contain Lessons

Lessons support:

Text content

Optional image URL

Ownership checks enforced (only course creator can modify content)

🎨 UI Highlights
My Learning (Student)

Coursera-style card layout

Visual progress bar

Completion badge

“Continue Learning” button

Responsive grid design

Course Content

Structured view of sections and lessons

Teacher-only content management

Student read-only access

🧭 Important Routes
Auth
/login
/register

Student
/dashboard
/courses
/my-courses
/announcements
/courses/:courseId/content

Teacher
/teacher/dashboard
/teacher/courses
/teacher/courses/create
/teacher/courses/:id/edit
/courses/:courseId/content
/courses/:courseId/add-section
/teacher/announcements/create

🗂 Project Structure
Backend
backend/
│
├── controllers/
│ ├── auth.controller.js
│ ├── course.controller.js
│ ├── enrollment.controller.js
│ ├── content.controller.js
│ └── announcement.controller.js
│
├── models/
│ ├── User.js
│ ├── Course.js
│ ├── Enrollment.js
│ ├── Section.js
│ ├── Lesson.js
│ └── Announcement.js
│
├── routes/
│ ├── auth.routes.js
│ ├── course.routes.js
│ ├── enrollment.routes.js
│ ├── content.routes.js
│ └── announcement.routes.js
│
├── middleware/
│ ├── auth.middleware.js
│ └── role.middleware.js
│
├── config/db.js
├── server.js
└── .env

Frontend
src/
│
├── api/
├── components/
│ ├── app/
│ ├── ui/
│ ├── protected/
│
├── context/
├── pages/
│ ├── auth/
│ ├── student/
│ ├── teacher/
│ ├── dashboard/
│ └── course/
│
├── utils/
├── App.jsx
└── main.jsx

🔐 Security & Validations

JWT verification on backend

Role-based authorization middleware

Ownership validation for course content

Backend guards against invalid ObjectIds

Protected frontend routes

🧪 Error Handling

Defensive backend checks for undefined params

Graceful frontend fallbacks

No server crashes on invalid routes

Clear console logging for debugging

🧠 Design Decisions

Course creation separated from content management

Content editing only allowed after course creation

Sections and lessons managed on dedicated pages

Student progress stored via Enrollment model

UI designed for scalability (quizzes, videos, certificates)

🔜 Planned Features

Lesson completion tracking

Resume last lesson

Quizzes & assessments

Video lessons

Certificate generation

Admin dashboard

Analytics & reports

🏁 How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📌 Project Goal

EduVillage aims to simulate a real-world LMS, focusing on:

Clean architecture

Secure role-based access

Scalable content management

Professional UI/UX

✨ Author

Developed as part of a Full-Stack Development Internship Project
using MERN stack best practices.
