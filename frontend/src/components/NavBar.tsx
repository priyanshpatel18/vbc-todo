import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const redirect = useNavigate();

  return (
    <div className="h-[64px] w-full p-[1rem] flex justify-between items-center border-b-[2px] border-[#CCC]">
      <div>
        <span
          onClick={() => {
            redirect("/");
          }}
          className="cursor-pointer"
        >
          ToDo App
        </span>
      </div>
      <div>
        <div
          onClick={() => {
            redirect("/login");
          }}
          className="cursor-pointer"
        >
          Login
        </div>
      </div>
    </div>
  );
}
