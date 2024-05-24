import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputProps {
  type: "text" | "password" | "email";
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

export default function Input({
  type,
  name,
  value,
  setValue,
  placeholder,
}: InputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <label
      htmlFor={name}
      className="flex flex-col border-2 border-[#000] py-[0.8rem] px-[1rem] rounded-lg"
    >
      <span className="font-semibold text-[0.8rem] uppercase">{name}</span>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-[1.1rem] outline-none border-none"
      />
    </label>
  );
}
