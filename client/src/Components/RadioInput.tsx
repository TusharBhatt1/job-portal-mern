import React from "react";

export default function RadioInput({
  value,
  label,
  onChange,
}: {
  value: string;
  label:string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <div className="flex items-center gap-3">
    <input type="radio" className="h-5 w-5 cursor-pointer  bg-red-100" name={"test"} value={value} onChange={onChange} />
    <label>{label}</label>
  </div>
}
