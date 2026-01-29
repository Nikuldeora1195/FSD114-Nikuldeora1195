import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../../components/app/TeacherLayout";
import Card from "../../components/ui/Card";
import {
  getCourseById,
  updateCourse,
} from "../../api/teacherCourseApi";

import toast from "react-hot-toast";




const { courseId } = useParams();






const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");



  const { courseId } = useParams();
  useEffect(() => {
    getCourseById(id)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
        });
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load course");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
  await updateCourse(id, form);
  toast.success("Course updated");
  setTimeout(() => navigate("/teacher/courses"), 700);
} catch {
  toast.error("Update failed");
}


    try {
      await updateCourse(id, form);
      setMessage("✅ Course updated successfully");
      setTimeout(() => {
        navigate("/teacher/courses");
      }, 800);
    } catch {
      setMessage("❌ Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  return (
    <TeacherLayout title="Edit Course">
      <div className="max-w-2xl">
        <Card title="Edit Course">
          {loading ? (
            <p>Loading course...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="Course title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <textarea
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Course description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                required
              />



                <div className="mt-10 border-t pt-6">
  <h2 className="text-lg font-semibold mb-3">
    Course Content
  </h2>

  <button
  type="button"
  onClick={() =>
    navigate(`/courses/${courseId}/content`)
  }
  className="bg-[#142C52] text-white px-4 py-2 rounded"
>
  Manage Sections & Lessons
</button>

</div>



<button
type="button"
  onClick={() =>
    navigate(`/courses/${courseId}/add-section`)
  }
  className="ml-3 border px-4 py-2 rounded"
>
  + Add Section
</button>


              <button
                disabled={saving}
                className="bg-[#142C52] text-white px-6 py-2 rounded"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              {message && (
                <p className="text-sm mt-2">{message}</p>
              )}
            </form>
          )}
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default EditCourse;
