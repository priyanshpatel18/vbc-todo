import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { Store } from "../store/store";
import { toast } from "sonner";

export default function NavBar() {
  const redirect = useNavigate();
  const store = Store();

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
        {store.user ? (
          <div
            onClick={async () => {
              await apiClient.post("/user/logout").then((res) => {
                store.setUser(null);
                redirect("/");
                toast.success(res.data.message);
              });
            }}
            className="cursor-pointer"
          >
            Logout
          </div>
        ) : (
          <div
            onClick={() => {
              redirect("/login");
            }}
            className="cursor-pointer"
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
}
