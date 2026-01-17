import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";


const StudentDashboard = () => {
  usePageTitle("Student Dashboard | EduVillage");

  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Student Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>

      <p>Quick actions:</p>
      <ul>
        <li>
          <Link to="/courses">Browse Courses</Link>
        </li>
        <li>
          <Link to="/my-courses">My Enrolled Courses</Link>
        </li>
      </ul>

      <p>
        Use this dashboard to explore courses and track your learning progress.
      </p>
    </div>
  );
};

export default StudentDashboard;
