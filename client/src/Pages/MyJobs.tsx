import { useEffect, useState } from "react";
import { JobType } from "./Home";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyJobs() {
  const navigate=useNavigate()
  
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user=localStorage.getItem("user")
    if(!user){
      toast.error("Kindly login first")
       navigate("/")
      return 
    }
    user=JSON.parse(user)
  
    
    setLoading(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fetch(`http://localhost:3000/myJobs/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setJobs(data);
        setFilteredJobs(data); // Initialize filteredJobs with all jobs
      });
  }, []);

  // //pagination
  // const indexOfLastItem=currentPage+itemsPerPage
  // const indexOfFirstItem=indexOfLastItem-itemsPerPage

  // const currentJobs=jobs.slice(indexOfFirstItem,indexOfLastItem)

  // const onNextPage=()=>{
  //   if(indexOfLastItem > jobs.length) setCurrentPage(currentPage+1)
  // }
  // const onPrevPage=()=>{
  //   if(currentPage > ) setCurrentPage(currentPage+1)
  // }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filtered = jobs.filter((j) =>
      j.jobTitle.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredJobs(filtered); // Update filteredJobs state
  };

  const handleDeletePost=(id:number)=>{
    fetch(`http://localhost:3000/delete-post/${id}`,{method:"DELETE"})
    setFilteredJobs(filteredJobs.filter((job)=>job._id!==id))
  }


  // if(filteredJobs.length<1) return <p className="text-center mt-7">No Job posted!</p>
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="flex flex-col gap-4">
       
        <div className="flex items-center justify-center gap-4">
        <span>All Jobs: {filteredJobs.length}</span>
          <input onChange={handleSearch} className="border p-2 px-7 focus:outline-none" placeholder="Search your posting" />
        </div>
       {/* table */}
       <div>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Location
                </th>
                <th scope="col" className="px-6 py-3">
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
  <p className="p-4">Loading...</p>
) : (
  filteredJobs.length === 0 ? (
    <tr>
      <td  className="text-center py-4">
        No job posted.
      </td>
    </tr>
  ) : (
    filteredJobs.map((job) => (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={job._id}>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {job.jobTitle}
        </th>
        <td className="px-6 py-4">
          {job.jobLocation}
        </td>
        <td className="px-6 py-4">
          {job.minPrice}-{job.maxPrice}$
        </td>
        <td className="px-6 py-4">
          <a href={`/updatejob/${job._id}`} className="text-blue-500">Edit</a>
        </td>
        <td className="px-6 py-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <button className="text-red-500" onClick={() => handleDeletePost(job._id)}>Delete</button>
        </td>
      </tr>
    ))
  )
)}

</tbody>

    </table>
</div>

       </div>
      </div>
    </div>
  );
}
