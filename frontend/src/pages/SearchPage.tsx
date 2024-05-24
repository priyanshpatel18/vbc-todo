import { motion } from "framer-motion";
import searchpage from "../assets/search.png";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col  bg-[#F5F3F4] h-[100dvh] "
    >
      <NavBar />
      <div className="flex flex-col gap-[1rem] flex-1 p-[1.5rem]">
        <div className="text-[2rem] font-bold uppercase text-center">
          search
        </div>
        <label className="flex flex-col border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-2xl">
          <div className="flex gap-[0.5rem] font-semibold">
            <img
              src={searchpage}
              alt="search"
              className="h-[1.7rem] w-[1.7rem]"
            />
            <input
              type="text"
              className="text-[1.1rem] outline-none border-none flex-1 bg-transparent"
              placeholder="Type Something..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </label>
      </div>
      <MenuBar />
    </motion.div>
  );
}
