import { useForm } from "react-hook-form";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { registerUser } from "../../Redux/Features/Auth/RegisterSlice";
import { 
  InputField, 
  SelectField, 
  FormContainer, 
  FormSection,
  FormIcons 
} from "../../Shared/CustomComponents/FormComponents/FormComponents";

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const { isRegister } = useSelector((state: any) => state.register);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      password: '',
    }
  });

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(data) as any);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister, navigate]);

  const roleOptions = [
    { value: "Instructor", label: "Instructor" },
    { value: "Student", label: "Student" }
  ];

  // Validation functions
  const validateField = async (fieldName: keyof RegisterFormData) => {
    await trigger(fieldName);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    return passwordRegex.test(password) && password.length >= 8;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <img src={Logo} alt="QuizWiz" className="h-12 mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Join QuizWiz Today
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Start your learning journey with our interactive quiz platform
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/login" 
                  className="group relative p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-500 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                      <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">Sign In</span>
                    <span className="text-sm text-neutral-500">Already have an account?</span>
                  </div>
                </Link>
                
                <div className="relative p-4 border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="font-medium text-primary-700 dark:text-primary-300">Sign Up</span>
                    <span className="text-sm text-primary-600">Create new account</span>
                  </div>
                </div>
              </div>
            </div>

            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <FormSection>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputField
                     label="First Name"
                     name="first_name"
                     placeholder="Enter your first name"
                     icon={FormIcons.user}
                     required
                     value={watch("first_name")}
                     onChange={(e) => {
                       setValue("first_name", e.target.value);
                       if (e.target.value.length >= 2) {
                         validateField("first_name");
                       }
                     }}
                     onBlur={() => validateField("first_name")}
                     error={watch("first_name") && watch("first_name").length < 2 ? "First name must be at least 2 characters" : ""}
                     autoComplete="given-name"
                   />
                   
                   <InputField
                     label="Last Name"
                     name="last_name"
                     placeholder="Enter your last name"
                     icon={FormIcons.user}
                     required
                     value={watch("last_name")}
                     onChange={(e) => {
                       setValue("last_name", e.target.value);
                       if (e.target.value.length >= 2) {
                         validateField("last_name");
                       }
                     }}
                     onBlur={() => validateField("last_name")}
                     error={watch("last_name") && watch("last_name").length < 2 ? "Last name must be at least 2 characters" : ""}
                     autoComplete="family-name"
                   />
                 </div>

                 <InputField
                   label="Email Address"
                   name="email"
                   type="email"
                   placeholder="Enter your email address"
                   icon={FormIcons.email}
                   required
                   value={watch("email")}
                   onChange={(e) => {
                     setValue("email", e.target.value);
                     if (e.target.value) {
                       validateField("email");
                     }
                   }}
                   onBlur={() => validateField("email")}
                   error={watch("email") && !validateEmail(watch("email")) ? "Please enter a valid email address" : ""}
                   autoComplete="email"
                 />

                 <SelectField
                   label="Role"
                   name="role"
                   options={roleOptions}
                   placeholder="Choose your role"
                   icon={FormIcons.user}
                   required
                   value={watch("role")}
                   onChange={(e) => {
                     setValue("role", e.target.value);
                     validateField("role");
                   }}
                   onBlur={() => validateField("role")}
                   error={!watch("role") ? "Please select your role" : ""}
                 />

                 <InputField
                   label="Password"
                   name="password"
                   type="password"
                   placeholder="Create a strong password"
                   icon={FormIcons.lock}
                   required
                   value={watch("password")}
                   onChange={(e) => {
                     setValue("password", e.target.value);
                     if (e.target.value.length >= 8) {
                       validateField("password");
                     }
                   }}
                   onBlur={() => validateField("password")}
                   error={watch("password") && !validatePassword(watch("password")) ? "Password must be at least 8 characters with uppercase, lowercase, and number" : ""}
                   autoComplete="new-password"
                 />
              </FormSection>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </FormContainer>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 p-8">
            <div className="text-center text-white">
              <img src={bgAuth} alt="QuizWiz" className="w-full max-w-md mx-auto mb-8" />
              <h2 className="text-2xl font-bold mb-4">Welcome to QuizWiz</h2>
              <p className="text-primary-100 max-w-sm mx-auto">
                Join thousands of learners and instructors creating engaging educational experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
