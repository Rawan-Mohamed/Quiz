import { useForm } from "react-hook-form";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { registerUser } from "../../Redux/Features/Auth/RegisterSlice";

const Register = () => {

  const dispatch = useDispatch();
  const { isRegister } = useSelector((state) => state.register);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    const data = getValues();
    dispatch(registerUser(data));
  };


  useEffect(() => {
    console.log("isRegister:", isRegister);
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full md:w-1/2 p-12 bg-slate-950 text-white">
        <img src={Logo} alt="Quizwiz" className="pb-10" />
        <p className="text-lime-300 font-bold pb-10 ">
          Continue your learning journey with QuizWiz!
        </p>

        <div className="flex mt-3">
          <Link to="/" className="signin w-1/2">
            <div className="content flex flex-col items-center text-8xl py-3 bg-stone-700 me-3 rounded-lg text-center border-4 ">
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </i>
              <p className="text-base mt-2">Sign in</p>
            </div>
          </Link>
          <div className="signup w-1/2">
            <div className="content flex flex-col items-center text-8xl py-3 bg-stone-700 me-3 rounded-lg text-center border-4  border-lime-300">
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
          </div>
          <div className="signup w-1/2"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
          <div className="flex space-x-4">
            <div className="w-1/2 relative">
              <label htmlFor="firstName" className="text-white">
                First Name
              </label>
              <div className="relative">
                <input
                  {...register("first_name", {
                    required: true,
                    // pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                  })}
                  id="firstName"
                  type="text"
                  className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
                  placeholder="type your first name"
                />

                {errors.first_name && errors.first_name.type === "required" && (
                  <span className="">first name is required</span>
                )}
                {errors.first_name && errors.first_name.type === "pattern" && (
                  <span className=" ">
                    The first name must contain characters and end with numbers
                    without spaces
                  </span>
                )}

                <i className="absolute left-2 top-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </i>
              </div>
            </div>

            <div className="w-1/2 relative">
              <label htmlFor="lastName" className="text-white">
                Last Name
              </label>
              <div className="relative">
                <input
                  {...register("last_name", {
                    required: true,
                    // pattern: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                  })}
                  id="lastName"
                  type="text"
                  className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
                  placeholder="type your last name"
                />

                {errors.last_name && errors.last_name.type === "required" && (
                  <span className="text-red-600">last name is required</span>
                )}
                {errors.last_name && errors.last_name.type === "pattern" && (
                  <span className="text-red-600">
                    The last name must contain characters and end with numbers
                    without spaces
                  </span>
                )}
                <i className="absolute left-2 top-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </i>
              </div>
            </div>
          </div>

          <label htmlFor="email" className="text-white">
            Your email address
          </label>
          <div className="relative">
            <input
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              id="email"
              type="email"
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
              placeholder="type your email address"
            />

            {errors.email && errors.email.type === "required" && (
              <span className="text-red-600">Email is required</span>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <span className="text-red-600 ">Email is invalid</span>
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

          <label htmlFor="password" className="text-white ">
            Your role
          </label>
          <div className="relative">
            <select
              style={{ width: "100%" }}
              className="w-full bg-slate-950 text-white p-2 mb-2 border border-white rounded-md pl-8"
              id="groupType"
              defaultValue=""
              {...register("role", {
                required: true,
              })}
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="Instructor">instructor</option>
              <option value="Student">student</option>
            </select>
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
              Sign Up
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
        </form>
      </div>

      <div className="hidden md:flex w-1/2 items-center">
        <img src={bgAuth} alt="bg" className="w-4/5" />
      </div>
    </div>
  );
};

export default Register;
