import { motion, useAnimation, useDragControls } from "framer-motion";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { Store, Todo } from "../store/store";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export default function AddToggle() {
  const store = Store();
  const [todoData, setTodoData] = useState<Todo>({
    title: "",
    description: "",
    dueDate: new Date(),
    workspaceName: store.category,
  });
  const [selectedDate, setSelectedDate] = useState<string>("today");

  const controls = useAnimation();
  const dragControls = useDragControls();
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

  async function handleAddTodo(e: FormEvent) {
    e.preventDefault();

    store.setIsLoading(true);
    let date;
    if (selectedDate === "today") {
      date = new Date();
    } else if (selectedDate === "tomorrow") {
      date = new Date();
      date.setDate(date.getDate() + 1);
    } else {
      date = new Date(selectedDate);
    }

    const formData = {
      title: todoData.title,
      description: todoData.description,
      dueDate: date.toISOString(),
      workspaceName: store.category,
    };

    await apiClient
      .post("/todo", formData)
      .then((res) => {
        toast.success(res.data.message);
        store.todos = [...store.todos, res.data.todo];
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          toast.error(err.response?.data.message);
        }
        console.log(err);
      })
      .finally(() => {
        store.setIsOpen(false);
        store.setIsLoading(false);
        setTodoData({
          title: "",
          description: "",
          dueDate: new Date(),
          workspaceName: store.category,
        });
      });
  }

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
        } else {
          console.log(event);
        }
      }}
      className={`${store.isOpen ? "visible" : "hidden"
        } z-[10] bg-[#F5F3F4] absolute bottom-0 rounded-t-2xl border-black border-2 p-[2rem]`}
    >
      <form
        className="w-full flex flex-col gap-[1.5rem]"
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          placeholder="Enter Title"
          className="w-full outline-none text-[1.2rem] border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg"
          value={todoData.title}
          onChange={(e) => {
            setTodoData({ ...todoData, title: e.target.value });
          }}
        />
        <textarea
          placeholder="Enter Description"
          rows={3}
          className="w-full outline-none text-[1.2rem] border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg"
          value={todoData.description}
          onChange={(e) => {
            setTodoData({ ...todoData, description: e.target.value });
          }}
        />

        <div className="grid grid-cols-3 gap-[0.5rem]">
          <div
            onClick={() => {
              handleDateSelection("today");
            }}
            className={`border-black border-[1px] shadow-lg rounded-lg p-[0.7rem] text-center ${selectedDate === "today" ? "bg-black text-white" : ""
              }`}
          >
            Today
          </div>
          <div
            onClick={() => handleDateSelection("tomorrow")}
            className={`border-black border-[1px] shadow-lg rounded-lg p-[0.7rem] text-center ${selectedDate === "tomorrow" ? "bg-black text-white" : ""
              }`}
          >
            Tomorrow
          </div>
          <label htmlFor="calendar" className="w-full">
            <input
              className={`w-full bg-white border-[1px] outline-none border-black rounded-lg p-[0.7rem] ${selectedDate === "date" ? "bg-black text-white" : ""
                }`}
              type="date"
              value={selectedDate === "date" ? "" : selectedDate}
              onChange={(e) => handleDateSelection(e.target.value)}
              id="calendar"
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-black text-white p-[1rem] rounded-lg"
            type="submit"
            disabled={store.isLoading}
          >
            Add Task
          </button>
        </div>
      </form>
    </motion.div>
  );
}
