import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link } from "react-router-dom";
function BottomNav() {
  return (
    <div className="relative">
      <div
        className="p-2 rounded-4xl bg-blue-500 hover:rotate-180 hover:bg-blue-600
      transition-all ease-in-out duration-[0.5s]
      cursor-pointer"
      >
        <Link to={"/tasks/create"}>
          <AddOutlinedIcon className="text-gray-200" style={{ fontSize: 50 }} />
        </Link>
      </div>
      <Link
        to={"/"}
        className="absolute right-[60px] p-3 bg-gray-700 rounded-4xl
      hover:rotate-360 hover:bg-gray-800
      transition-all ease-in-out duration-[0.5s]
      cursor-pointer

      "
      >
        <RefreshIcon className="text-gray-100" style={{ fontSize: 35 }} />
      </Link>
    </div>
  );
}

export default BottomNav;
