import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import TodoComponent from "../components/Todo";
import { Store, Todo } from "../store/store";

export default function HomePage() {
  const redirect = useNavigate();
  const store = Store();
  const location = useLocation();
  const [todayTasks, setTodayTasks] = useState<Todo[] | []>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Todo[] | []>([]);

  useEffect(() => {
    store.setCategory(location.pathname.replace("/", ""));
    store.getUser(redirect, "/login");
    const todayDate = new Date();

    const filteredTodayTasks = store.todos.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return (
        todo.workspaceName === store.category &&
        dueDate.toDateString() === todayDate.toDateString()
      );
    });

    const filteredUpcomingTasks = store.todos.filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return (
        todo.workspaceName === store.category &&
        dueDate.toDateString() !== todayDate.toDateString() &&
        dueDate > todayDate
      );
    });

    if (
      JSON.stringify(todayTasks) !== JSON.stringify(filteredTodayTasks) ||
      JSON.stringify(upcomingTasks) !== JSON.stringify(filteredUpcomingTasks)
    ) {
      setTodayTasks(filteredTodayTasks);
      setUpcomingTasks(filteredUpcomingTasks);
    }
  }, [store.todos]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-[#F5F3F4] h-[100vh] "
    >
      <NavBar />
      <div className="flex flex-col flex-1 p-[1.5rem] overflow-hidden">
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="text-[1.8rem] font-bold uppercase">today</div>
          {todayTasks && todayTasks.length > 0 ? (
            todayTasks.map((todo, index) => (
              <TodoComponent todo={todo} key={index} />
            ))
          ) : (
            <span className="text-[1.2rem] capitalize">no task</span>
          )}
          <div className="text-[1.8rem] font-bold uppercase">upcoming</div>
          {upcomingTasks && upcomingTasks.length > 0 ? (
            upcomingTasks.map((todo, index) => (
              <TodoComponent todo={todo} key={index} />
            ))
          ) : (
            <span className="text-[1.2rem] capitalize">no task</span>
          )}
        </div>
      </div>
      <MenuBar className="w-full fixed bottom-0 z-[1]" />
    </motion.div>
  );
}
