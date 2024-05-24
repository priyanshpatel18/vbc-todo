import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import searchpage from "../assets/search.png";
import { motion } from "framer-motion";
export default function SearchPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col  bg-[#F5F3F4] h-[100dvh] "
        >
            <NavBar />
            <div className="flex-1">
                <div className="w-full h-[20%] flex flex-col gap-[0.5rem] flex-1 p-[1rem]  ">
                    <p className="text-[20px] font-semibold poppins-medium ">
                        Search
                    </p>
                    <div className="w-full h-[80%] flex flex-row font-semibold text-[25px] bg-white p-2 rounded-2xl  ">
                        <div className="w-[20%]">
                            <img
                                src={searchpage}
                                alt=""
                                className=" rounded-lg w-[35px]"
                            />
                        </div>
                        <input
                            type="text"
                            className="rounded-lg w-[100%] text-[17px] outline-none"
                            placeholder="Task or dates"
                        />
                    </div>
                </div>
            </div>
            <MenuBar />
        </motion.div>
    );
}
