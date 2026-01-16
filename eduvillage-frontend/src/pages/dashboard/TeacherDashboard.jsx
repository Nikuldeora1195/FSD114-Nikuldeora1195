import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>

      <p>
        Manage your courses here.  
        You can create, publish, and monitor student enrollments.
      </p>
    </div>
  );
};

export default TeacherDashboard;
