import { useEffect, useState } from "react";
import { JobType } from "./Home";
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAllData from "../hooks/useAllData";

export default function MyJobs() {
  const navigate = useNavigate();

  const { myJobs, setMyJobs, fetchedMyJobs, setFetchedMyJobs } = useAllData();
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      // toast.error("Kindly login first");
      alert("Kindly login first");
      navigate("/");
      return;
    }
    user = JSON.parse(user);
    if (fetchedMyJobs) {
      setFilteredJobs(myJobs)
      return;
    }

    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fetch(`https://procareer-be.onrender.com/myJobs/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMyJobs([...data]);
        setFilteredJobs(data); // Initialize filteredJobs with all jobs
        setFetchedMyJobs(true);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filtered = myJobs.filter((j) =>
      j.jobTitle.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredJobs(filtered); // Update filteredJobs state
  };

  const handleDeletePost = (id: number) => {
    fetch(`http://localhost:3000/delete-post/${id}`, { method: "DELETE" });
    setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
  };
  
  
   
  // if(filteredJobs.length==0) return <p className="text-center mt-7">No Job posted!</p>
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-center gap-4">
          <span>All Jobs: {filteredJobs.length}</span>
          <input
            onChange={handleSearch}
            className="border p-2 px-7 focus:outline-none"
            placeholder="Search your posting"
          />
        </div>
        {/* table */}
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-xs text-center  text-gray-500 dark:text-gray-400">
              <thead className="text-xs sm:text-lg text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:inline-block">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:inline-block">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loading/>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td className="text-center py-4">No job posted.</td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={job._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {job.jobTitle}
                      </th>
                      <td className="px-6 py-4 hidden sm:inline-block">{job.jobLocation}</td>
                      <td className="px-6 py-4 hidden sm:inline-block">
                        {job.minPrice}-{job.maxPrice}$
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/updatejob/${job._id}`}
                          className="text-blue-500"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                       
                       
                        <button
                          className="text-red-500"
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-expect-error
                          onClick={() => handleDeletePost(job._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}
function Loading()
  {
    return (
  
      <div>
        <div role="status" className="max-w-full p-4 animate-pulse bg-white">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
      </div>
  
)
  }
