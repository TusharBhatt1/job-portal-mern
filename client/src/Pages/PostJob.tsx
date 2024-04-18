import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export type Inputs = {
  jobTitle: string;
  jobLocation: string;
  companyName: string;
  companyLogo: string;
  minPrice: string;
  maxPrice: string;
  salaryType: string;
  postingDate: string;
  experienceLevel: string;
  employmentType: string;
  description: string;
  postedBy: string;
};

export default function PostJob() {
  const [email, setEmail] = useState("");
  const [today, setToday] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     if(!localStorage.getItem("user")) {
      toast.error("Login to post job")
      return 
     }
    // Assuming email is defined earlier
    data.postedBy = email;
    data.postingDate = today;

    fetch("http://localhost:3000/post-job", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      toast.success("Job Posted Successfully");
      reset();
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      toast.dark("Kindly Login to Post Job");
      navigate("/");
      return;
    }
    user = JSON.parse(user);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setEmail(user.email);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();

    // Format the date as desired (e.g., YYYY-MM-DD)
    const today = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    setToday(today);
  }, []);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <p className="py-4 text-xl">Post Job</p>

      <div className="bg-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 text-sm gap-4 w-full items-center justify-center">
            {/* inputs */}
            <div className=" w-full flex flex-col gap-2">
              <label>Job Title</label>
              <input
                {...register("jobTitle", { required: true })}
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
                {...register("companyName", { required: true })}
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
                {...register("jobLocation", { required: true })}
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
                {...register("companyLogo", { required: true })}
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
                type="number"
                {...register("minPrice", { required: true })}
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
                type="number"
                {...register("maxPrice", { required: true })}
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
                {...register("salaryType", { required: true })}
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
              <input value={today} disabled className="p-2 bg-white" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label>Experience</label>
              <select
                {...register("experienceLevel", { required: true })}
                className="p-2"
              >
                <option value={""}>Choose</option>
                <option value={"No Experience"}>No experience</option>
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
                {...register("employmentType", { required: true })}
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
                rows={4}
                {...register("description", { required: true })}
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
                disabled
                value={email}
                type="email"
                className="p-2 bg-white"
              />
            </div>
          </div>
          <Button title="Submit" />
        </form>
      </div>
    </div>
  );
}
