import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";


const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  usePageTitle("Teacher Dashboard | EduVillage");


  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>

      <p>Quick actions:</p>
      <ul>
        <li>
          <Link to="/teacher/courses">My Courses</Link>
        </li>
      </ul>

      <p>
        Use this dashboard to manage your courses and control publishing.
      </p>
    </div>
  );
};

export default TeacherDashboard;
