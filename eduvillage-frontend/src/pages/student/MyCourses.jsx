// import { useEffect, useState } from "react";
// import {
//   getMyEnrollments,
//   updateProgress,
// } from "../../api/courseApi";
// import usePageTitle from "../../utils/usePageTitle";
// import Card from "../../components/ui/Card";
// import StudentLayout from "../../components/app/StudentLayout";


// const MyCourses = () => {
//   usePageTitle("My Courses | EduVillage");

//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState("");

//   const loadCourses = async () => {
//     try {
//       const res = await getMyEnrollments();
//       setCourses(res.data);
//     } catch {
//       setError("Failed to load enrolled courses");
//     }
//   };

//  useEffect(() => {
//   const fetchCourses = async () => {
//     try {
//       const res = await getMyEnrollments();
//       setCourses(res.data);
//     } catch {
//       setError("Failed to load enrolled courses");
//     }
//   };

//   fetchCourses();
// }, []);


//   const handleProgressChange = async (id, value) => {
//     const progress = Number(value);
//     if (progress < 0 || progress > 100) return;

//     try {
//       await updateProgress(id, progress);
//       loadCourses();
//     } catch {
//       console.error("Progress update failed");
//     }
//   };

  

//   return (
//     <StudentLayout title="Courses">

  
//     <div style={{ maxWidth: "800px", margin: "auto" }}>
//       <h2>My Enrolled Courses</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {courses.length === 0 && (
//         <p>You have not enrolled in any courses yet.</p>
//       )}

//       {courses.map((item) => (
//         <Card key={item._id} title={item.course?.title}>
//           <p>Progress: {item.progress}%</p>

//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={item.progress}
//             onChange={(e) =>
//               handleProgressChange(item._id, e.target.value)
//             }
//           />

//           {item.isCompleted && (
//             <p style={{ color: "green", marginTop: "8px" }}>
//               ✅ Completed · 🎓 Certificate Eligible
//             </p>
//           )}
//         </Card>
//       ))}
//     </div>
//       </StudentLayout>
//   );
// };

// export default MyCourses;







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";
import usePageTitle from "../../utils/usePageTitle";
import StudentLayout from "../../components/app/StudentLayout";

const MyCourses = () => {
  usePageTitle("My Learning | EduVillage");

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  // 🔄 Load enrolled courses
  const loadCourses = async () => {
    try {
      const res = await getMyEnrollments();
      setCourses(res.data);
    } catch {
      setError("Failed to load enrolled courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // 📊 Update progress
  const handleProgressChange = async (id, value) => {
    const progress = Number(value);
    if (progress < 0 || progress > 100) return;

    try {
      await updateProgress(id, progress);
      loadCourses();
    } catch {
      console.error("Progress update failed");
    }
  };

  return (
    <StudentLayout title="My Learning">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-[#142C52]">
          My Enrolled Courses
        </h1>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {courses.length === 0 && (
          <p className="text-gray-600">
            You have not enrolled in any courses yet.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((item) => {
            const course = item.course;
            const progress = item.progress || 0;

            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                <h2 className="text-lg font-semibold text-[#142C52] mb-2">
                  {course?.title}
                </h2>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course?.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Progress: {progress}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#142C52] h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Manual Progress Update (Optional) */}
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) =>
                    handleProgressChange(
                      item._id,
                      e.target.value
                    )
                  }
                  className="border rounded px-2 py-1 text-sm mb-4 w-full"
                />

                {item.isCompleted && (
                  <p className="text-green-600 text-sm mb-3">
                    ✅ Completed · 🎓 Certificate Eligible
                  </p>
                )}

                {/* Continue Learning */}
                <button
                  onClick={() =>
                    navigate(
                      `/courses/${course?._id}/content`
                    )
                  }
                  className="mt-auto bg-[#142C52] text-white py-2 rounded-md hover:bg-[#0f2140] transition"
                >
                  Continue Learning
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyCourses;
