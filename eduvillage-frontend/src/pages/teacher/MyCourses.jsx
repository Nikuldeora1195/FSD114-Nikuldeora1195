import { useEffect, useRef, useState } from "react";
import {
  // getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";
import TeacherLayout from "../../components/app/TeacherLayout";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../api/teacherCourseApi";


const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const debounceRef = useRef(null);

  // ✅ EXISTING LOGIC (UNCHANGED)
  const loadCourses = () => {
    getMyCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to load courses");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // ✅ EXISTING LOGIC (UNCHANGED)
  const handleProgress = (id, value) => {
    if (value < 0 || value > 100) return;

    setSavingId(id);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        await updateProgress(id, Number(value));
        loadCourses();
      } catch (err) {
        console.error("Progress update failed");
      } finally {
        setSavingId(null);
      }
    }, 600);
  };

  return (
    <TeacherLayout title="Teacher Dashboard">
      <div className="max-w-4xl mx-auto">

        {/* ✅ NEW: TEACHER ACTION BAR (ADDED) */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#142C52]">
            My Enrolled Courses
          </h2>

          <div className="flex gap-3">
            <Link
              to="/teacher/courses/create"
              className="bg-[#142C52] text-white px-4 py-2 rounded text-sm"
            >
              + Create Course
            </Link>

            <Link
              to="/teacher/courses"
              className="bg-[#5B74A3] text-white px-4 py-2 rounded text-sm"
            >
              Manage My Courses
            </Link>
          </div>
        </div>

        {/* ✅ EXISTING UI (UNCHANGED) */}
        {loading && (
          <p className="text-sm text-gray-600">
            Loading courses...
          </p>
        )}

        {!loading && courses.length === 0 && (
          <div className="bg-white rounded-lg p-6 shadow">
            <p>You have not enrolled in any courses yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl p-6 shadow"
            >
              <h4 className="text-lg font-medium mb-2">
                {item.course?.title}
              </h4>

              <p className="text-sm mb-2">
                Progress: {item.progress}%
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-[#142C52] h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={item.progress}
                  onChange={(e) =>
                    handleProgress(item._id, e.target.value)
                  }
                  className="border px-3 py-1 rounded w-24"
                  disabled={savingId === item._id}
                />

                {savingId === item._id && (
                  <span className="text-sm text-gray-500">
                    Saving…
                  </span>
                )}
              </div>

              {item.isCompleted && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  ✔ Course Completed
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default MyCourses;
