import { useState } from "react";
import edit from "../assets/edit.png";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("patel");
  const [email, setEmail] = useState("patel@gmail.com");

  const [editMode, setEditMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-[100vh] bg-[#F5F3F4]"
    >
      <NavBar />
      <div className="flex flex-col gap-[1.5rem] flex-1 p-[1.5rem]">
        <div className="text-[2rem] font-bold uppercase text-center">
          Profile
        </div>
        <div className="flex flex-col border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg">
          <span className="font-semibold text-[0.8rem] uppercase">
            display name
          </span>
          <div className="flex items-center justify-between gap-[1rem]">
            <input
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              className="text-[1.2rem] border-none outline-none bg-transparent flex-1"
              readOnly={!editMode}
            />
            {editMode ? (
              <></>
            ) : (
              <img
                src={edit}
                alt="edit"
                className="h-[1.1rem] w-[1.1rem] cursor-pointer"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg">
          <span className="font-semibold text-[0.8rem] uppercase">Email</span>
          <div className="flex items-center justify-between gap-[1rem]">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="text-[1.2rem] border-none outline-none bg-transparent flex-1"
              readOnly={!editMode}
            />
            {editMode ? (
              <></>
            ) : (
              <img
                src={edit}
                alt="edit"
                className="h-[1.1rem] w-[1.1rem] cursor-pointer"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              />
            )}
          </div>
        </div>
        <button
          className="p-[1rem] border-2 border-[#000] rounded-lg disabled:bg-[#DDD]"
          disabled={!editMode}
          onClick={() => setEditMode(!editMode)}
        >
          <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
            save
          </span>
        </button>
        <button
          className="p-[1rem] border-2 border-[#000] rounded-lg disabled:bg-[#DDD]"
          disabled={editMode}
        >
          <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
            delete my account
          </span>
        </button>
      </div>
      <MenuBar />
    </motion.div>
  );
}
