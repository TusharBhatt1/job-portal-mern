import { JobType } from '../Pages/Home'
import JobBox from './JobBox'

export default function Jobs({jobs}:{jobs:JobType[] | undefined}) {
   

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
