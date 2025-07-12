
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/Features/Auth/LoginSlice";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../Redux/Store";
import { 
  InputField, 
  FormContainer, 
  FormSection,
  FormIcons 
} from "../../Shared/CustomComponents/FormComponents/FormComponents";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
    trigger,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(data) as any);
      const islogged = localStorage.getItem("userRole");
      if (islogged === "Instructor" || islogged === "Student") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 7;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 7 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
                Welcome Back!
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Sign in to continue your learning journey with QuizWiz
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative p-4 border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-primary-700 dark:text-primary-300">Sign In</span>
                    <span className="text-sm text-primary-600">Access your account</span>
                  </div>
                </div>
                
                <Link 
                  to="/register" 
                  className="group relative p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-500 transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                      <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">Sign Up</span>
                    <span className="text-sm text-neutral-500">Create new account</span>
                  </div>
                </Link>
              </div>
            </div>

            <FormContainer onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                handleSubmit(onSubmit)(e);
              }
            }}>
              <FormSection>
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  icon={FormIcons.email}
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                />

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  icon={FormIcons.lock}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  autoComplete="current-password"
                />
              </FormSection>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/forget-password" 
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[140px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </FormContainer>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative text-center text-white z-10">
              <img src={bgAuth} alt="QuizWiz" className="w-full max-w-md mx-auto mb-8 drop-shadow-2xl" />
              <h2 className="text-2xl font-bold mb-4">Ready to Learn?</h2>
              <p className="text-primary-100 max-w-sm mx-auto">
                Access your personalized learning dashboard and continue your educational journey
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
