// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck


export default function Banner({
  handleChange,

}: {
 
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  query: string
}) {


  const debounce = (cb) => {
    let timer;
    return function (args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(()=>cb(args),300);
    };
  };
  const handleChangeBetter=debounce(handleChange)
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-14 flex flex-col gap-4">
      <h1 className=" text-3xl font-bold md:text-5xl">
        Find your <span className="text-blue-500">new job</span> today
      </h1>
      <p className="mb-4">
        Thousands of jobs in the computer , engineering and technology sectors.
      </p>

      <form className="flex flex-wrap justify-center gap-4 items-center">
        <input
          type="text"
          className="border-2 flex-1 border-1 bg-transparent p-2 px-4 rounded-md focus:outline-none"
          placeholder="What position are you looking for ?"
          onChange={handleChangeBetter}
        />
      </form>
    </div>
  );
}
