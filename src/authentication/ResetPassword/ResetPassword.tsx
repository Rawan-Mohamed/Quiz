// import React from "react";
import { useCallback } from "react";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPass } from "../../Redux/Features/Auth/resetPasswordSlice";


const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = useCallback(async (data: { email: string}) => {
    try {
    console.log(data);    
      await dispatch(resetPass(data));
        navigate("/login");
      
    } catch (error) {

      console.error("Email error:", error);
    }
  }, [
    dispatch, navigate
  ]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full md:w-1/2 p-12 bg-slate-950 text-white">
        <img src={Logo} alt="Quizwiz" className="pb-10" />
        <p className="text-lime-300 font-bold pb-10 ">Reset password</p>


        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
          <label htmlFor="email" className="text-white">Email address</label>
          <div className="relative">
            <input
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              id="email"
              type="email"
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8" // Added pl-8 for left padding
              placeholder="type your email"
            />

            {errors.email && errors.email.type === "required" && (
              <span className="text-red-600">Email is required</span>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <span className="text-red-600">Email is invalid</span>
            )}
            <i className="absolute left-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white p-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </i>
          </div>

          <label htmlFor="email" className="text-white">OTP</label>
          <div className="relative">
            <input
              {...register("otp", {
                required: true,

              })}
              type="text"
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8" // Added pl-8 for left padding
              placeholder="type your otp"
            />

            {errors.otp && errors.otp.type === "required" && (
              <span className="text-red-600">Otp code is required</span>
            )}
            <i className="absolute left-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white p-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </i>
          </div>

          <label htmlFor="email" className="text-white">Password</label>
          <div className="relative">
            <input
              {...register("password", {
                required: true,
                pattern:
                /^(?=.[0-9])(?=.\d)[a-zA-Z\d]{7,}$/,
              })}

              type="password"
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
              placeholder="type your password"
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-600">password is required</span>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <span className="text-red-600">password is invalid</span>
            )}
            <i className="absolute left-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </i>
          </div>
{/* 
          <label htmlFor="password" className="text-white relative">
            Confirm Password
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: true,
                })}
                id="password"
                type="password"
                className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
                placeholder="type your confirm password"
              />

              {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                <span className="text-red-600">confirmPassword is required</span>
              )}
              <i className="absolute left-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>

              </i>
            </div>
          </label> */}

          <div className="relative">
            <button
              type="submit"
              className="flex items-center justify-center w-40 bg-white text-slate-950 hover:bg-white p-2 mt-6 font-semibold rounded-md"
            >

              send

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

export default ResetPassword;