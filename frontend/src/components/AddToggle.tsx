import { motion, useAnimation, useDragControls } from "framer-motion";
import { Store } from "../store/store";
import { useEffect, useState } from "react";

export default function AddToggle() {
    const controls = useAnimation();
    const [selectedDate, setSelectedDate] = useState("today");
    const dragControls = useDragControls();
    const store = Store();
    const bottomToTopVariants = {
        hidden: { y: "100%" },
        visible: { y: "0%" },
    };
    const handleDateSelection = (selection) => {
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
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
                if (info.offset.y > 50) {
                    store.setIsOpen(false); // Assuming setIsOpen is a method to update isOpen in your store
                }
            }}
            className={`${
                store.isOpen ? "visible" : "hidden"
            } poppins-medium z-[1111] absolute bottom-0 bg-white h-[50%] w-[100%] rounded-t-2xl border-black border-2`}
        >
            <div className="h-[20%] w-[100%] flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Task Name"
                    className="w-[90%] h-[80%] outline-none text-xl"
                />
            </div>
            <div className="h-[20%] w-[100%] flex justify-center items-center ">
                <input
                    type="textarea"
                    placeholder="Description"
                    className="w-[90%] h-[80%] outline-none"
                />
            </div>

            <div className="h-[20%] w-[100%] flex justify-around items-center  ">
                <button
                    onClick={() => handleDateSelection("today")}
                    className={`border-black border-[1px] shadow-xl rounded-xl p-1 ${
                        selectedDate === "today" ? "bg-black text-white" : ""
                    }`}
                >
                    Today
                </button>
                <button
                    onClick={() => handleDateSelection("tomorrow")}
                    className={`border-black border-[1px] shadow-xl rounded-xl p-1 ${
                        selectedDate === "tomorrow" ? "bg-black text-white" : ""
                    }`}
                >
                    Tomorrow
                </button>
                <input
                    className={`bg-white border-[1px] outline-none border-black rounded-xl p-1 ${
                        selectedDate === "date" ? "bg-black text-white" : ""
                    }`}
                    type="date"
                    value={selectedDate == "date" ? "" : selectedDate}
                    onChange={(e) => handleDateSelection(e.target.value)}
                />
            </div>
            <div className="h-[20%] w-[100%] flex justify-center items-center  ">
                <button className="bg-black text-white p-3 rounded-xl">
                    Add
                </button>
            </div>
        </motion.div>
    );
}
