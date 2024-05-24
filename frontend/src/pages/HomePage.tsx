import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col  bg-[#F5F3F4] h-[100dvh] "
        >
            <NavBar />
            <div className="flex-1">
                <div className="flex flex-col gap-[1.5rem] flex-1 p-[1.5rem] font-semibold text-[25px] ">
                    Today
                </div>
                <div className="flex flex-col gap-[1.5rem] flex-1 p-[1.5rem] ">
                    NO TASK
                </div>
            </div>
            <MenuBar />
        </motion.div>
    );
}
