import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BrowsePage() {
  const redirect = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-[#F5F3F4] h-[100dvh]"
    >
      <NavBar />
      <div className="flex flex-col gap-[1rem] flex-1 p-[1.5rem]">
        <div className="text-[2rem] font-bold uppercase text-center">
          browse
        </div>
        <h1 className="capitalize text-semibold text-[1.3rem]">
          your projects
        </h1>
        <div className="flex flex-col gap-[1rem] flex-1 mb-[1rem]">
          <div
            className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
            onClick={() => {
              redirect("/personal");
            }}
          >
            <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
              personal
            </span>
          </div>
          <div
            className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
            onClick={() => {
              redirect("/work");
            }}
          >
            <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
              work
            </span>
          </div>
          <div
            className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
            onClick={() => {
              redirect("/education");
            }}
          >
            <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
              education
            </span>
          </div>
        </div>
      </div>
      <MenuBar />
    </motion.div>
  );
}
