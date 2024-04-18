import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  value: string;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: Record<string,any>;
  placeholder?: string;
};

export default function Input({ label, value, register, errors, validation, placeholder }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
        <label>{label}</label>
        <input className="border-2 p-2" {...register(value, validation)} placeholder={placeholder} />
        {errors[value]?.type === "required" && <span className="text-red-400">{validation?.required}</span>}
        {errors[value]?.type === "minLength" && <span className="text-red-400">{validation?.minLength?.message}</span>}
        {errors[value]?.type === "pattern" && <span className="text-red-400">{validation?.pattern?.message}</span>}
    </div>
  );
}
