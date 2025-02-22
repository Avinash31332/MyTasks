import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import BottomNav from "../components/BottomNav";
import Axios from "../utils/Axios";

function Home() {
  const [datas, setDatas] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await Axios.get("/api/tasks");
        const tasks = res.data;
        setDatas(tasks);
        const completedTasks = tasks.filter(
          (task) => task.status === "completed"
        );
        setCompleted(completedTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-blue-100">
      <div className="p-2 w-full h-[90%]">
        {/* Passing the tasks to the Task component */}
        <Task tasks={datas} />
      </div>
      <div className="z-[200] w-full flex items-center justify-end p-4 fixed bottom-[70px] right-[5px]">
        <BottomNav />
      </div>
      {/* Task count display */}
      <div className="flex items-center gap-[10px] rounded-lg font-medium z-[100] left-0 bottom-0 fixed p-2 px-4 text-xl text-blue-700 cursor-pointer">
        <p className="bg-blue-600 rounded-4xl p-4 text-gray-100">
          {completed.length}/{datas.length}
        </p>
      </div>
    </div>
  );
}

export default Home;
