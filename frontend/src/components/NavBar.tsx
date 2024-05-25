import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const redirect = useNavigate();

  return (
    <div className="h-[64px] w-full p-[1rem] flex justify-between items-center border-b-[2px] border-[#000]">
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
      <div className="py-[0.5rem] px-[1rem] rounded-lg border-[2px] border-[#000] uppercase">
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
