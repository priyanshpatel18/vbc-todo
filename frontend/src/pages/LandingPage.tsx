import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function LandingPage() {
  const redirect = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-[#F5F3F4]">
      <NavBar />
      <div>
        <h1 className="text-center text-[1.6rem] lg:text-[2rem]">
          How do you want to use TodoApp?
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row flex-1 gap-[1rem] w-full h-[calc(100vh - 64px)] py-[1rem] px-[2rem] lg:px-[3rem]">
        <div
          onClick={() => {
            redirect("/personal");
          }}
          className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
        >
          <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
            personal
          </span>
        </div>
        <div
          onClick={() => {
            redirect("/work");
          }}
          className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
        >
          <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
            work
          </span>
        </div>
        <div
          onClick={() => {
            redirect("/education");
          }}
          className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
        >
          <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
            education
          </span>
        </div>
      </div>
    </div>
  );
}
