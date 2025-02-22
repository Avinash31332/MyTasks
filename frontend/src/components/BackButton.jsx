import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton() {
  const navigate = useNavigate();
  function backNavigate() {
    navigate(-1);
  }
  return (
    <button
      className="fixed z-[100] top-[20px] left-[20px] bg-blue-500 rounded-lg px-2 py-1 text-gray-100"
      onClick={backNavigate}
    >
      <ArrowBackIcon />
    </button>
  );
}

export default BackButton;
