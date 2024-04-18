import Filter from "./Filter";
export default function Sidebar({
  handleRadioFilter,
}: {
  handleRadioFilter: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white p-7 lg:p-4 flex flex-col gap-7">
      <span className="font-bold">Filters</span>
      <div className="flex flex-wrap lg:flex-col gap-7">
        <Filter
          name="Location"
          values={["London", "San Francisco", "Brussels"]}
          handleRadioFilter={handleRadioFilter}
        />
        <Filter
          name="Type"
          values={["Temporary", "Part-time", "Full-time"]}
          handleRadioFilter={handleRadioFilter}
        />
        <Filter
          name="Salary"
          values={["30000", "50000", "100000"]}
          handleRadioFilter={handleRadioFilter}
        />
      </div>
    </div>
  );
}
