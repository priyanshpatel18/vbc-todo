import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { Store } from "../store/store";

export default function LandingPage() {
  const redirect = useNavigate();
  const store = Store();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen w-full bg-[#F5F3F4]"
    >
      <NavBar />
      <div className="flex flex-col flex-1">
        <div>
          <h1 className="text-center text-[1.6rem] lg:text-[2rem]">
            How do you want to use TodoApp?
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row flex-1 gap-[1rem] w-full py-[1rem] px-[2rem] lg:px-[3rem]">
          <div
            onClick={() => {
              redirect("/personal");
              store.setCategory("personal");
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
              store.setCategory("work");
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
              store.setCategory("education");
            }}
            className="h-full w-full cursor-pointer rounded-lg border-2 border-[#000] flex items-center justify-center"
          >
            <span className="font-semibold uppercase text-[2.5rem] lg:text-[4rem]">
              education
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
