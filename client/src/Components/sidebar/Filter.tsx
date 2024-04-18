import React from "react";
import RadioInput from "../RadioInput";

export default function Filter({
  name,
  values,
  handleRadioFilter,
}: {
  name: string;
  values: string[];
  handleRadioFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-slate-400">{name}</span>
      <div>
        <RadioInput label="All" value="" onChange={handleRadioFilter} />
        {values.map((value, index) => (
          <RadioInput
            key={index}
            label={`${name==="Salary" ? `< ${value}` : value }`}
            value={value}
            onChange={handleRadioFilter}
          />
        ))}
      </div>
    </div>
  );
}
