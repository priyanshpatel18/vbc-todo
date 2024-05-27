import calender from "../assets/calendar.png";
import profile from "../assets/profile.png";
import search from "../assets/search.png";
import browse from "../assets/browse.png";
import plus from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { Store } from "../store/store";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const redirect = useNavigate();
  const store = Store();

  return (
    <div className={`${className}`}>
      <div className="bg-[#F5F3F4] relative w-full h-[10vh] p-[1.2rem] flex justify-between items-center font-bold bg-[f6dfdf] border-t-2 border-[#000] rounded-t-lg">
        <div className="w-[35%] flex justify-between items-center">
          <div className="flex flex-col items-center cursor-pointer">
            <div
              className="relative"
              onClick={() => {
                redirect(`/${store.category}`);
              }}
            >
              <span className="text-[0.8rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-35%]">
                {new Date().getDate()}
              </span>
              <img
                src={calender}
                alt="calender"
                className="h-[1.5rem] w-[1.5rem]"
              />
            </div>
            <span>Today</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              redirect("/search");
            }}
          >
            <img src={search} alt="search" className="h-[1.5rem] w-[1.5rem]" />
            <span>Search</span>
          </div>
        </div>

        <div className="bg-[#F5F3F4] cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-120%] border-[3px] border-[#000] rounded-full p-[1rem]">
          <img
            onClick={() => store.setIsOpen(!store.isOpen)}
            src={plus}
            alt="plus"
            className="h-[1.5rem] w-[1.5rem]"
          />
        </div>

        <div className="w-[35%] flex justify-between items-center">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              redirect("/browse");
            }}
          >
            <img src={browse} alt="browse" className="h-[1.5rem] w-[1.5rem]" />
            <span>Browse</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              redirect("/profile");
            }}
          >
            <img
              src={profile}
              alt="profile"
              className="h-[1.5rem] w-[1.5rem]"
            />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
