import { useForm } from "react-hook-form";
import bgAuth from "../../assets/image.png";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { forgetPassword } from "../../Redux/Features/Auth/ForgetPasswordSlice";
import { 
  InputField, 
  FormContainer, 
  FormSection,
  FormIcons 
} from "../../Shared/CustomComponents/FormComponents/FormComponents";

interface ForgetPasswordFormData {
  email: string;
}

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ForgetPasswordFormData>({
    email: ''
  });
  const [errors, setErrors] = useState<Partial<ForgetPasswordFormData>>({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ForgetPasswordFormData>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof ForgetPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ForgetPasswordFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = useCallback(async (data: ForgetPasswordFormData) => {
    setIsLoading(true);
    try {
      await dispatch(forgetPassword(data) as any);
      setIsSuccess(true);
    } catch (error) {
      console.error("Forget password error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Check Your Email
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We've sent a password reset link to <strong>{formData.email}</strong>. Please check your email and follow the instructions to reset your password.
            </p>
            <div className="space-y-4">
              <Link 
                to="/login"
                className="block w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Back to Sign In
              </Link>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ email: '' });
                }}
                className="block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <img src={Logo} alt="QuizWiz" className="h-12 mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Forgot Password?
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Visual Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-warning-100 dark:bg-warning-900/20 rounded-full">
                <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                We'll send you a secure link to reset your password
              </p>
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
              </FormSection>

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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <Link 
                  to="/login" 
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 font-medium transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </FormContainer>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Need Help?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                If you're still having trouble accessing your account, contact our support team.
              </p>
              <Link 
                to="/contact" 
                className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-warning-500 to-warning-600 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative text-center text-white z-10">
              <img src={bgAuth} alt="QuizWiz" className="w-full max-w-md mx-auto mb-8 drop-shadow-2xl" />
              <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
              <p className="text-warning-100 max-w-sm mx-auto">
                We'll help you get back to your learning journey quickly and securely
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

export default ForgetPassword;