import { motion, useAnimation, useDragControls } from "framer-motion";
import { Store } from "../store/store";
import { SetStateAction, useEffect, useState } from "react";

export default function AddToggle() {
  const controls = useAnimation();
  const [selectedDate, setSelectedDate] = useState("today");
  const dragControls = useDragControls();
  const store = Store();
  const bottomToTopVariants = {
    hidden: { y: "100%" },
    visible: { y: "0%" },
  };
  const handleDateSelection = (selection: SetStateAction<string>) => {
    setSelectedDate(selection);
  };
  useEffect(() => {
    if (store.isOpen) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [store.isOpen, controls]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={bottomToTopVariants}
      transition={{ type: "keyframes", stiffness: 500, damping: 25 }}
      drag="y"
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.y > 50) {
          store.setIsOpen(false);
        }
      }}
      className={`${
        store.isOpen ? "visible" : "hidden"
      } z-[10] bg-[#F5F3F4] absolute bottom-0 rounded-t-2xl border-black border-2 p-[2rem] w-full flex flex-col gap-[1.5rem]`}
    >
      <input
        type="text"
        placeholder="Enter Title"
        className="w-full outline-none text-[1.2rem] border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg"
      />
      <textarea
        placeholder="Enter Description"
        rows={3}
        className="w-full outline-none text-[1.2rem] border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg"
      />

      <div className="grid grid-cols-3 gap-[0.5rem]">
        <button
          onClick={() => handleDateSelection("today")}
          className={`border-black border-[1px] shadow-lg rounded-lg p-[0.7rem] ${
            selectedDate === "today" ? "bg-black text-white" : ""
          }`}
        >
          Today
        </button>
        <button
          onClick={() => handleDateSelection("tomorrow")}
          className={`border-black border-[1px] shadow-lg rounded-lg p-[0.7rem] ${
            selectedDate === "tomorrow" ? "bg-black text-white" : ""
          }`}
        >
          Tomorrow
        </button>
        <label htmlFor="calendar" className="w-full">
          <input
            className={`w-full bg-white border-[1px] outline-none border-black rounded-lg p-[0.7rem] ${
              selectedDate === "date" ? "bg-black text-white" : ""
            }`}
            type="date"
            value={selectedDate === "date" ? "" : selectedDate}
            onChange={(e) => handleDateSelection(e.target.value)}
            id="calendar"
          />
        </label>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-black text-white p-[1rem] rounded-lg">
          Add Task
        </button>
      </div>
    </motion.div>
  );
}
