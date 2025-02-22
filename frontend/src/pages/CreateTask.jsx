import { useState } from "react";
import Axios from "../utils/Axios";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
function CreateTask() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  async function handleCreate() {
    try {
      const res = await Axios.post("/api/tasks", data);
      navigate(-1);
      // Optionally, you can navigate back or clear the form here.
    } catch (err) {
      console.error("Error creating task:", err.message);
    }
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
          maxLength={25}
          required
        />
        <p className="text-lg">{data.title.length}/25</p>
        <hr className="border-2 w-[96%] border-zinc-200" />
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-[96%] text-xl mt-2 outline-0 min-h-[75%] max-h-[75%] p-2"
          placeholder="Write description"
          style={{ resize: "none", scrollbarColor: "black" }}
          required
        />
      </div>
      <button
        onClick={handleCreate}
        className="fixed right-[20px] bottom-[10px] px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Task
      </button>
      <div className="fixed bottom-[0px] left-[0px] bg-blue-100 p-2 rounded-lg">
        Please fill all the fields
      </div>
    </div>
  );
}

export default CreateTask;
