import { useEffect, useState } from "react";
import { getMyEnrollments } from "../../api/courseApi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getMyEnrollments().then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div>
      <h2>My Enrolled Courses</h2>

      {courses.map((item) => (
        <div key={item._id}>
          <h4>{item.course.title}</h4>
          <p>Progress: {item.progress}%</p>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
