import { create } from "zustand";
import { JobType } from "../Pages/Home";

interface allData {
  fetchedAllJobs: boolean;
  setFetchedAllJobs: (v: boolean) => void;
  fetchedMyJobs: boolean;
  setFetchedMyJobs: (v: boolean) => void;
  allJobs: JobType[] | [];
  setAllJobs: (value: JobType[]) => void;
  myJobs: JobType[] | [];
  setMyJobs: (value: JobType[]) => void;
}

const useAllData = create<allData>((set) => ({
  fetchedAllJobs: false,
  setFetchedAllJobs: (v) => set({ fetchedAllJobs: v }),
  fetchedMyJobs: false,
  setFetchedMyJobs: (v) => set({ fetchedMyJobs: v }),
  allJobs: [],
  setAllJobs: (value) => set({ allJobs: value }),
  myJobs: [],
  setMyJobs: (value) => set({ myJobs: value }),
}));
export default useAllData;
