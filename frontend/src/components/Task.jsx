import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Axios from "../utils/Axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Task() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    Axios.get("/api/tasks")
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  }, []);

  function handleDelete(id) {
    const ok = window.confirm("Do you want to delete the task?");
    if (!ok) return "";
    Axios.delete(`/api/tasks/${id}`)
      .then(() => {
        setDatas((prevDatas) => prevDatas.filter((task) => task._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      });
  }

  // Compute the current date in a readable format
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // Full day name (e.g., "Tuesday")
    year: "numeric", // Full year (e.g., 2025)
    month: "long", // Full month name (e.g., "February")
    day: "numeric", // Day of the month (e.g., 22)
  });
  // if (datas.length >= 0) {
  //   return (
  //     <div className="w-full h-[90%] overflow-y-hidden">
  //       <p className="text-xl font-semibold p-4 text-blue-600 bg-gray-100 border-2 border-zinc-200">
  //         {formattedDate}
  //       </p>
  //       <Link
  //         to={"/tasks/create"}
  //         className="mt-16 flex justify-center items-center h-[50%] bg-blue-200 border-1 border-blue-100 rounded-lg text-blue-400 text-xl font-medium"
  //       >
  //         <AddOutlinedIcon />
  //         Add your First Task
  //       </Link>
  //     </div>
  //   );
  // }
  return (
    <div>
      <p className="text-xl font-semibold p-4 text-blue-600 bg-gray-100 border-2 border-zinc-200">
        {formattedDate}
      </p>
      {datas.map((data) => (
        <div
          key={data._id}
          className={`${
            data.status === "pending"
              ? "bg-gray-100 border-gray-300"
              : "bg-blue-400 text-gray-100 border-blue-400"
          } w-full my-2 text-lg p-4 font-medium rounded-xl flex justify-between items-center border-1`}
        >
          <Link to={`/tasks/update/${data._id}`} className="flex-1">
            <p>{data.title}</p>
          </Link>

          <div className="flex items-center gap-3">
            <div>
              {data.status === "completed" ? (
                <CheckCircleIcon
                  className="text-blue-100"
                  style={{ fontSize: 35 }}
                />
              ) : (
                <WatchLaterIcon
                  className="text-blue-500"
                  style={{ fontSize: 35 }}
                />
              )}
            </div>

            <button
              onClick={() => handleDelete(data._id)}
              className="p-2 bg-blue-100 hover:bg-red-200 rounded-xl flex items-center"
            >
              <DeleteIcon className="text-blue-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Task;
