import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobType } from "./Home";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./PostJob";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

export default function UpdateJob() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [job, setJob] = useState<JobType>({});
  const { id } = useParams();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    fetch(`http://localhost:3000/getjob/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);
  const {
    companyLogo,
    companyName,
    jobLocation,
    maxPrice,
    minPrice,
    description,
    jobTitle,
    salaryType,
    employmentType,
    experienceLevel,
    postingDate,
    postedBy,
  } = job;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const onSubmit: SubmitHandler<Inputs> = (formData: JobType) => {
    const data = {
      jobTitle: formData.jobTitle || job.jobTitle,
      companyName: formData.companyName || job.companyName,
      jobLocation: formData.jobLocation || job.jobLocation,
      companyLogo: formData.companyLogo || job.companyLogo,
      minPrice: formData.minPrice || job.minPrice,
      maxPrice: formData.maxPrice || job.maxPrice,
      salaryType: formData.salaryType || job.salaryType,
      postingDate: formData.postingDate || job.postingDate,
      experienceLevel: formData.experienceLevel || job.experienceLevel,
      employmentType: formData.employmentType || job.employmentType,
      description: formData.description || job.description,
      postedBy: formData.postedBy || job.postedBy,
    };

    fetch(`http://localhost:3000/updatejob/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      alert("Job updated successfully");
      navigate("/my-jobs")

      reset();
    });
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <p className="py-4 text-xl">Update Job</p>
      <div className="bg-slate-100">
        <form className="py-8 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 text-sm gap-4 w-full items-center justify-center">
            {/* inputs */}
            <div className=" w-full flex flex-col gap-2">
              <label>Job Title</label>
              <input
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="border bg-white p-2"
                placeholder="Enter job title"
              />
              {errors.jobTitle && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Company Name</label>
              <input
                defaultValue={companyName}
                {...register("companyName")}
                className="border bg-white p-2"
                placeholder="Enter company name"
              />
              {errors.companyName && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Job Location</label>
              <input
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="border bg-white p-2"
                placeholder="Enter job location"
              />
              {errors.jobLocation && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Company Logo</label>
              <input
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="border bg-white p-2"
                placeholder="Enter company logo URL"
              />
              {errors.companyLogo && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Minimum Salary</label>
              <input
                defaultValue={minPrice}
                type="number"
                {...register("minPrice")}
                className="border bg-white p-2"
                placeholder="Enter minimum salary"
              />
              {errors.minPrice && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Maximum Salary</label>
              <input
                defaultValue={maxPrice}
                type="number"
                {...register("maxPrice")}
                className="border bg-white p-2"
                placeholder="Enter maximum salary"
              />
              {errors.maxPrice && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Salary Type</label>
              <select
                defaultValue={salaryType}
                {...register("salaryType")}
                className="p-2"
              >
                <option value={""}>Choose</option>
                <option value={"Hourly"}>Hourly</option>
                <option value={"Monthly"}>Monthly</option>
                <option value={"Yearly"}>Yearly</option>
              </select>
              {errors.salaryType && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Posting Date</label>
              <input
                defaultValue={postingDate}
                type="date"
                {...register("postingDate")}
                className="p-2"
                placeholder="Select posting date"
              />
              {errors.postingDate && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Experience</label>
              <select
                defaultValue={experienceLevel}
                {...register("experienceLevel")}
                className="p-2"
              >
                <option value={""}>Choose</option>
                <option value={"NoExperience"}>No experience</option>
                <option value={"Internship"}>Internship</option>
                <option value={"workRemotely"}>Work Remotely</option>
              </select>
              {errors.experienceLevel && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Employment Type</label>
              <select
                defaultValue={employmentType}
                {...register("employmentType")}
                className="p-2"
              >
                <option value={""}>Choose</option>
                <option value={"Full-time"}>Full time</option>
                <option value={"Part-time"}>Part time</option>
                <option value={"Temporary"}>Temporary</option>
              </select>
              {errors.employmentType && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Job Description</label>
              <textarea
                defaultValue={description}
                rows={4}
                {...register("description")}
                className="p-2"
                placeholder="Enter job description"
              />
              {errors.description && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Your Email</label>
              <input
                defaultValue={postedBy}
                type="email"
                {...register("postedBy")}
                className="p-2"
                placeholder="Enter your email address"
              />
              {errors.postedBy && (
                <span className="text-red-400">This field is required</span>
              )}
            </div>
          </div>
          <Button title="Update" />
        </form>
      </div>
    </div>
  );
}
