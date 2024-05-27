import { FormEvent, useEffect, useState } from "react";
import edit from "../assets/edit.png";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { Store } from "../store/store";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function ProfilePage() {
  const store = Store();
  const [displayName, setDisplayName] = useState<string>(
    store.user?.displayName || ""
  );
  const [email, setEmail] = useState<string>(store.user?.email || "");
  const [editMode, setEditMode] = useState(false);

  const redirect = useNavigate();

  useEffect(() => {
    async function getUser() {
      await apiClient.get("/user").then((res) => {
        if (res.data) {
          store.setUser(res.data);
          setEmail(res.data.email);
          setDisplayName(res.data.displayName);
        } else {
          store.setUser(null);
          redirect("/login");
        }
      });
    }

    getUser();
  }, []);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    setEditMode(false);

    if (
      email === store.user?.email &&
      displayName === store.user?.displayName
    ) {
      toast.info("No Changes");
      return;
    }

    await apiClient
      .put("/user", {
        displayName,
        email,
      })
      .then((res) => {
        toast.success(res.data.message);
        store.setUser({
          displayName,
          email,
        });
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          toast.error(err.response?.data.message);
        }
        console.log(err);
      })
      .finally(() => {
        store.setIsLoading(false);
      });
  }

  async function handleDelete() {
    await apiClient.delete("/user").then((res) => {
      toast.success(res.data.message);
      store.setUser(null);
      redirect("/login");
    });
  }

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
        <form className="flex flex-col gap-[1.5rem]" onSubmit={handleUpdate}>
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
            type="submit"
          >
            <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
              save
            </span>
          </button>
        </form>
        <button
          className="p-[1rem] border-2 border-[#000] rounded-lg disabled:bg-[#DDD]"
          disabled={editMode}
          onClick={handleDelete}
        >
          <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
            delete my account
          </span>
        </button>
      </div>
      <MenuBar className="w-full fixed bottom-0 z-[1]" />
    </motion.div>
  );
}
