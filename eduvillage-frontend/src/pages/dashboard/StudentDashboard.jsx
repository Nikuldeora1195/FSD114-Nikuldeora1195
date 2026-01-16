import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Student Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>

      <p>
        Welcome to your learning dashboard.  
        Here you can explore courses, enroll, and track your progress.
      </p>
    </div>
  );
};

export default StudentDashboard;
