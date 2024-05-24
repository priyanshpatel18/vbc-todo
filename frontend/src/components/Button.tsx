interface ButtonProps {
  buttonText: string;
}

export default function Button({ buttonText }: ButtonProps) {
  return (
    <button
      className="p-[1rem] border-2 border-[#000] rounded-lg"
      type="submit"
    >
      <span className="text-[1.2rem] font-semibold uppercase tracking-[0.3rem]">
        {buttonText}
      </span>
    </button>
  );
}
