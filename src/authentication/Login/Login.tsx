
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/Features/Auth/LoginSlice";
import { useCallback, useEffect } from "react";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading, islogged } = useSelector((state) => state.login || {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(async (data: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(data));
      // Check if login was successful before redirecting
      const islogged = localStorage.getItem("userRole");
      // if (islogged === "admin" || islogged === "user")
      if (islogged === "Instructor" || "Student") {
        navigate("/dashboard");
      }
    } catch (error) {

      console.error("Login error:", error);
    }
  }, [dispatch, navigate]);

  return (
    <>


      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="w-full md:w-1/2 p-12 bg-slate-950 text-white">
          <img src={Logo} alt="Quizwiz" className="pb-10" />
          <p className="text-lime-300 font-bold pb-10 ">
            Continue your learning journey with QuizWiz!
          </p>

          <div className="flex mt-3 ">
            <div className="signin w-1/2">
              <div className="content flex flex-col items-center text-8xl py-3 bg-stone-700 me-3 rounded-lg text-center border-4 border-lime-300 ">
                <i>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"

                    className="w-6 h-6 text-white p-1"

                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"

                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </i>

                <p className="text-base mt-2">Sign in</p>
              </div>
            </div>
            <Link to="/register" className="signup w-1/2">
              <div className="content flex flex-col items-center text-8xl py-3 bg-stone-700 me-3 rounded-lg text-center border-4  ">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                </i>
                <p className="text-base mt-2">Sign Up</p>
              </div>
            </Link>
            <div className="signup w-1/2"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
            <label htmlFor="email" className="text-white">
              Registered email address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
                id="email"
                type="email"
                className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8" // Added pl-8 for left padding
                placeholder="Type your email"
              />

              {errors.email && errors.email.type === "required" && (
                <span className="text-red-600">Email is required</span>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <span className="text-red-600">Email is invalid</span>
              )}

              <i className="absolute left-2 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </i>
            </div>

            <label htmlFor="password" className="text-white relative">
              Password
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    pattern:
                      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      /^(?=.*[0-9])(?=.*\d)[a-zA-Z\d]{7,}$/
                  })}
                  id="password"
                  type="password"
                  className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8" // Added pl-8 for left padding
                  placeholder="Type your password"
                />

                {errors.password && errors.password.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span className="text-red-600">password is invalid</span>
                )}
                <i className="absolute left-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 p-1 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>
                </i>
              </div>
            </label>

            <div className="relative">
              <button
                type="submit"
                className="flex items-center justify-center w-40 bg-white text-slate-950 hover:bg-white p-2 mt-6 font-semibold rounded-md"
              >
                Sign In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-slate-950 ml-2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </button>
            </div>
            <div className="form-group my-3 d-flex justify-content-between">
              <Link
                to='/forget-password'
                className='text-white text-decoration-none'>Forgot Password?</Link>
            </div>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 items-center">
          <img src={bgAuth} alt="bg" className="w-4/5" />

        </div>
      </div>


    </>
  );
};
export default Login;
