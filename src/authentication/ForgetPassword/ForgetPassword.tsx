// import React from "react";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgetPass } from "../../Redux/Features/Auth/ForgetPasswordSlice";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = useCallback(async (data: { email: string}) => {
    try {
    console.log(data);    
      await dispatch(forgetPass(data));
        navigate("/reset-password");
      
    } catch (error) {

      console.error("Email error:", error);
    }
  }, [
    dispatch, navigate
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full md:w-1/2 p-12 bg-slate-950 text-white">
        <img src={Logo} alt="Quizwiz" className="pb-12" />
        <p className="text-lime-300 pb-10 font-bold ">Forget Password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
          <label htmlFor="email" className="text-white p-2">Email address</label>
          <div className="relative">
            <input
              {...register("email",
                {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                })}
              id="email"
              type="email"
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8" // Added pl-8 for left padding
              placeholder="Type your email"
            />

            {errors.email && errors.email.type === "required" && (<span className='text-red-600'>Email is required</span>)}

            {errors.email && errors.email.type === "pattern" && (<span className='text-red-600'>Email is invalid</span>)}

            <i className="absolute left-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white p-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </i>
          </div>

          <div className="relative">
            <button
              type="submit"
              className="flex items-center justify-center w-40 bg-white text-slate-950 hover:bg-white p-2 mt-6 font-semibold rounded-md"
            >

              Send

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-950 ml-2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 items-center">
        <img src={bgAuth} alt="bg" className="w-4/5" />
      </div>
    </div>
  );
};

export default ForgetPassword;