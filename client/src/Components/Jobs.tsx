import { JobType } from '../Pages/Home'
import JobBox from './JobBox'

export default function Jobs({jobs,loading}:{jobs:JobType[] | undefined,loading:boolean}) {
   const values=["1","2","3","4"]
  
    
   if(loading) {
     return (
       <div>
         {values.map((v) => (
           <div key={v}>
             <div role="status" className="max-w-full p-4 animate-pulse bg-white">
               <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
               <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
               <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
               <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
               <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
               <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
               <span className="sr-only">Loading...</span>
             </div>
           </div>
         ))}
       </div>
     );
   } 
    if(jobs?.length===0) return <span className='font-bold'>No data found</span>
  
  return (
    <div className='flex flex-col gap-4 bg-white p-4 px-2 md:px-7'>
         <span>{jobs?.length} Job(s)</span>
         {jobs?.map((job,index)=>(
            <JobBox key={index} job={job}/>
         ))}
    </div>
  )
}
