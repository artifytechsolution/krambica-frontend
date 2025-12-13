"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  User,
  ShoppingBag,
  Package,
  TrendingUp,
  Mail,
  Lock,
} from "lucide-react";
import CustomInput from "@src/component/customeFormField";
import { useUserLogin } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "@src/redux/reducers/authSlice";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState, setError } = methods;
  const { errors } = formState;

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError,
    mutate: login,
  } = useUserLogin();
  console.log("Login Rendered");
  console.log(isLoginError);
  console.log(loginData?.data?.user);

  useEffect(() => {
    if (loginData && !isLoginLoading) {
      dispatch(setAuthToken(loginData.data.token));
      dispatch(setUser(loginData?.data?.user));
      toast.success(loginData?.message ?? "Login Successful");
      reset();
      router?.push("/home");
    }
    if (isLoginError && loginError) {
      console.error("Login Error:", loginError);
      toast.error(
        loginError?.message ||
          (typeof loginError === "string"
            ? loginError
            : "Login failed. Please check your email and password.")
      );
      setError("root", {
        type: "server",
        message: loginError?.message || "Login failed",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loginData,
    isLoginLoading,
    loginError,
    isLoginError,
    reset,
    router,
    dispatch,
    setError,
  ]);

  const onSubmit = async (data) => {
    try {
      login(data);
    } catch (err) {
      toast.error("Unexpected error.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Left Section - Welcome */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative background waves */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z"
                fill="currentColor"
                className="text-gray-400"
              />
              <path
                d="M0,250 Q250,200 500,250 T1000,250 L1000,0 L0,0 Z"
                fill="currentColor"
                className="text-gray-300"
              />
              <path
                d="M0,400 Q250,350 500,400 T1000,400 L1000,0 L0,0 Z"
                fill="currentColor"
                className="text-gray-200"
              />
            </svg>
          </div>

          <div className="max-w-xl mx-auto relative z-10 select-none">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
              Welcome to <span className="text-rose-600">Mega Dhaka.</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 leading-tight">
              The Largest Wholesale
              <br />
              Marketplace.
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              One-stop wholesale business solution of imported products. We
              ensure product quality, on time delivery and hassle free service.
            </p>
            <div className="flex items-center gap-4 mb-12 flex-wrap">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 border-3 border-white shadow-md flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-3 border-white shadow-md flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-3 border-white shadow-md flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 border-3 border-white shadow-md flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                20k+ buyers joined with us, now it's your turn
              </p>
            </div>
            {/* Enhanced Illustration */}
            <div className="relative mt-8">
              {/* ... SVG illustration code unchanged ... */}
              {/* You can paste your SVG JSX block here as is */}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
              Log in
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Login form"
              noValidate
            >
              {/* Email Input - Using CustomInput Component */}
              <CustomInput
                name="email"
                label="E-mail"
                type="email"
                placeholder="contact@megadhaka.com"
                className={`mb-5 ${errors.email ? "border-red-500" : ""}`}
                icon={<Mail className="w-5 h-5" />}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                }}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {/* {errors.email && (
                <p className="text-red-500 text-xs mt-1" id="email-error">{errors.email.message}</p>
              )} */}

              {/* Password Input - Using CustomInput Component */}
              <CustomInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                className={`mb-5 ${errors.password ? "border-red-500" : ""}`}
                icon={<Lock className="w-5 h-5" />}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1" id="password-error">
                  {errors.password.message}
                </p>
              )}

              {/* Server/API error */}
              {errors.root && (
                <p className="text-red-500 text-sm mb-4" id="api-error">
                  {errors.root.message}
                </p>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 text-purple-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-100 cursor-pointer accent-purple-900 transition-all"
                      aria-checked={rememberMe}
                    />
                  </div>
                  <span className="ml-2.5 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-900 font-medium transition-colors text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full bg-gradient-to-r from-rose-500 via-red-500 to-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-rose-600 hover:via-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={isLoginLoading}
              >
                {isLoginLoading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mb-8">
              New to Mega Dhaka?{" "}
              <a
                href="/signup"
                className="text-rose-600 font-semibold hover:text-rose-700 transition-colors"
              >
                Sign Up free
              </a>
            </p>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Log in with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                type="button"
                className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                aria-label="Sign in with Facebook"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                type="button"
                className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                aria-label="Sign in with Google"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
            </div>

            {/* Need Help */}
            <div className="text-center">
              <p className="text-gray-600">
                Need Help?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors inline-flex items-center gap-1"
                >
                  Live Chat
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
