// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Jobs from "../Components/Jobs";
import Sidebar from "../Components/sidebar/Sidebar";
import NewsLetter from "../Components/NewsLetter";
import { toast } from "react-toastify";
import useAllData from "../hooks/useAllData";

export interface JobType {
  _id?: number;
  id: number;
  companyLogo: string;
  jobTitle: string;
  jobLocation: string;
  companyName: string;
  minPrice: string;
  maxPrice: string;
  salaryType: string;
  postingDate: string;
  experienceLevel: string;
  employmentType: string;
  description: string;
  postedBy?: string;
}

export default function Home() {
  const { allJobs, setAllJobs, fetchedAllJobs, setFetchedAllJobs } =
    useAllData();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const onNextPage = () => {
    if (currentPage < Math.ceil(filteredItems?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const pr1 = fetch("https://procareer-be.onrender.com/getAllJobs");
      const pr2 = fetch("jobs.json");
      const [jobs1, jobs2] = await Promise.allSettled([pr1, pr2]);
      let data1 = 0;
      await new Promise((res) => setTimeout(res, 3000));

      if (jobs1.status === "fulfilled") {
        data1 = await jobs1.value.json();
      }
      let data2 = 0;
      if (jobs2.status === "fulfilled") data2 = await jobs2.value.json();

      if (data1.length > 0 || data2.length > 0) {
        setAllJobs([...data1, ...data2]); // Directly pass the concatenated array
      }
      setFetchedAllJobs(true);
    } catch (err) {
      console.log(err);
      setAllJobs([]);
      toast.error("Failed to fetch all jobs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fetchedAllJobs) return;
    getAllJobs();
  }, []);

  const filteredItems = allJobs?.filter((job) =>
    job?.jobTitle?.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRadioFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const filterData = (
    jobs: JobType[],
    selectedCategory: string,
    query: string
  ) => {
    let filteredJobs = allJobs;

    if (query) {
      filteredJobs = filteredJobs?.filter(
        (job) =>
          job?.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
          job.companyName?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredJobs = filteredJobs?.filter(
        ({ jobLocation, maxPrice, employmentType }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          parseInt(maxPrice * 1000) <= parseInt(selectedCategory) ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    //slice the data based on current page

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs;
  };

  const result = filterData(allJobs || [], selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleChange={handleChange} />
      <div className="flex flex-col gap-2 md:grid grid-cols-4 py-7 bg-slate-100 md:px-7 gap-4">
        <Sidebar handleRadioFilter={handleRadioFilter} />

        <div className="col-span-2 flex flex-col">
          <Jobs loading={loading} jobs={result} />

          {/* pagination */}
          {result.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-4">
              <button
                disabled={currentPage === 1}
                className="disabled:text-slate-400 disabled:decoration-none"
                onClick={onPrevPage}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems?.length / itemsPerPage)}
              </span>
              <button
                disabled={
                  currentPage ===
                  Math.ceil(filteredItems?.length / itemsPerPage)
                }
                className="disabled:text-slate-400 disabled:decoration-none"
                onClick={onNextPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <NewsLetter />
      </div>
    </div>
  );
}
