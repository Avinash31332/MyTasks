import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "pending", // default value based on schema
  });

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await Axios.get(`/api/tasks/${id}`);
          setData({
            ...res.data,
            // Ensure valid status values, defaulting to "pending" if necessary
            status: ["pending", "completed"].includes(res.data.status)
              ? res.data.status
              : "pending",
          });
        } catch (err) {
          console.error("Error fetching task:", err);
        }
      };
      fetchTask();
    }
  }, [id]);

  async function handleUpdate() {
    try {
      // This will update the task with the current title, description, and status
      const res = await Axios.put(`/api/tasks/${id}`, data);
      // Optionally navigate back after update:
      navigate(-1);
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  }

  // Toggle the status between "pending" and "completed"
  function toggleStatus() {
    setData((prevData) => ({
      ...prevData,
      status: prevData.status === "pending" ? "completed" : "pending",
    }));
  }

  return (
    <div className="overflow-y-hidden">
      <BackButton />
      <div className="relative pl-4 my-16 w-full h-screen">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-[96%] text-2xl min-h-[50px] my-2 outline-0"
          placeholder="Title"
        />
        <p className="text-lg">{data.title.length}/25</p>

        <hr className="border-2 w-[96%] border-zinc-200" />
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-[96%] text-xl mt-2 outline-0 min-h-[75%] max-h-[75%] p-2"
          placeholder="Write description"
          style={{ resize: "none", scrollbarColor: "black" }}
        />
        <div className="mt-4 fixed bottom-[10px]">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.status === "completed"}
              onChange={toggleStatus}
              className="form-checkbox"
            />
            <span>{data.status === "completed" ? "Completed" : "Pending"}</span>
          </label>
        </div>
      </div>
      <div>
        <button
          onClick={handleUpdate}
          className="fixed right-[20px] bottom-[10px] px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

export default UpdateTask;
