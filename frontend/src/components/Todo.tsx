import { Store, type Todo } from "../store/store";
import check from "../assets/check.png";
import apiClient from "../apiClient/apiClient";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface TodoProps {
  todo: Todo;
}

export default function Todo({ todo }: TodoProps) {
  const store = Store();

  async function handleStatus() {
    store.setIsLoading(true);

    await apiClient
      .patch(`/todo/${todo._id}`, {
        status: todo.status === "completed" ? "pending" : "completed",
      })
      .then(() => {
        toast.success("Status updated");
        store.todos.find((t) => t._id === todo._id)!.status =
          todo.status === "completed" ? "pending" : "completed";
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          toast.error(err.response?.data?.message);
        }
        console.log(err.message);
      })
      .finally(() => {
        store.setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[1rem] px-[1rem] py-[0.5rem] mb-[1rem] border-[1px] border-[#000] rounded-md">
        <div
          className="flex items-center justify-center w-[2rem] h-[2rem] border-2 border-[#000] rounded-md p-[2px] cursor-pointer"
          onClick={handleStatus}
        >
          {todo.status === "completed" ? (
            <img src={check} alt="check" />
          ) : (
            <></>
          )}
        </div>
        <div
          className={`${todo.status === "completed" ? "line-through text-[#aaa]" : ""
            }`}
        >
          <div className="text-[1.5rem] font-semibold">{todo.title}</div>
          <div className="text-[1.2rem]">{todo.description}</div>
        </div>
      </div>
    </div>
  );
}
