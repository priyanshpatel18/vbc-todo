import { Store } from "../store/store";

interface ButtonProps {
  buttonText: string;
}

export default function Button({ buttonText }: ButtonProps) {
  const store = Store();

  return (
    <button
      className="p-[1rem] border-2 border-[#000] rounded-lg"
      type="submit"
      disabled={store.isLoading}
    >
      <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
        {buttonText}
      </span>
    </button>
  );
}
