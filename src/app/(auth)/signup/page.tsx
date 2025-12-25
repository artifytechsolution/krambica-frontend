"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useUserSignup } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "@src/redux/reducers/authSlice";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import CustomInput from "@src/component/customeFormField";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. Setup Form
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false, // Mandatory terms checkbox
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState,
    setError,
    register,
    watch,
    setValue,
    clearErrors,
  } = methods;

  const { errors } = formState;

  // 2. Watch fields for real-time validation & UI state
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const termsAccepted = watch("terms");

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isError: isRegisterError,
    isLoading: isRegisterLoading,
    data: registerData,
    error: registerError,
    mutate: registerUser,
  } = useUserSignup();

  // 3. Handle API Response
  useEffect(() => {
    if (registerData && !isRegisterLoading) {
      dispatch(setAuthToken(registerData.data.token));
      dispatch(setUser(registerData?.data?.user));
      toast.success(registerData?.message ?? "Account created successfully!");
      reset();
      router?.push("/login");
    }
    if (isRegisterError && registerError) {
      setError("root", {
        type: "server",
        message: registerError?.message || "Registration failed",
      });
    }
  }, [
    registerData,
    isRegisterLoading,
    registerError,
    isRegisterError,
    reset,
    router,
    dispatch,
    setError,
  ]);

  // 4. Submit Handler
  const onSubmit = async (data) => {
    clearErrors("root");

    // Final password match check (redundant but safe)
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      // Exclude 'confirmPassword' and 'terms' from API payload
      const { confirmPassword, terms, ...signupPayload } = data;
      registerUser(signupPayload);
    } catch (err) {
      toast.error("Unexpected error.");
    }
  };

  const toggleTerms = () => {
    setValue("terms", !termsAccepted, { shouldValidate: true });
  };

  return (
    <FormProvider {...methods}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        .font-serif {
          font-family: "Playfair Display", serif;
        }
        .font-sans {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
      `}</style>

      <div className="min-h-screen w-full flex bg-white font-sans selection:bg-emerald-100">
        {/* --- LEFT SIDE: Editorial Visual (Desktop) --- */}
        <div className="hidden lg:block lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920&auto=format&fit=crop"
            alt="Krambica Editorial"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-12 left-12 text-white p-8 max-w-lg">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-90">
              Join the Community
            </p>
            <h2 className="font-serif text-5xl leading-tight mb-6">
              "Style is a way to say who you are without having to speak."
            </h2>
            <div className="h-px w-20 bg-white/60" />
          </div>
        </div>

        {/* --- RIGHT SIDE: Signup Form --- */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col relative bg-white h-full overflow-y-auto custom-scrollbar">
          {/* Logo */}

          <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-28 py-24">
            <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 leading-tight">
                  Create Account
                </h1>
                <p className="text-stone-500 text-sm lg:text-base font-sans font-light tracking-wide">
                  Join us for exclusive access and personalized style.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-12 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11"
                      rules={{ required: "Full name is required" }}
                    />
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1 font-medium ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="w-full h-12 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email address",
                        },
                      }}
                    />
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1 font-medium ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="phone"
                      type="tel"
                      placeholder="1234567890"
                      className="w-full h-12 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid 10-digit number",
                        },
                      }}
                    />
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1 font-medium ml-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full h-12 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11 pr-12"
                      rules={{
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 chars" },
                      }}
                    />
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1 font-medium ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Confirm Password
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full h-12 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11 pr-12"
                      rules={{
                        required: "Please confirm your password",
                        validate: (val) =>
                          val === password || "Passwords do not match",
                      }}
                    />
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1 font-medium ml-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions Checkbox */}
                <div
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    errors.terms
                      ? "bg-red-50 border-red-200"
                      : "bg-stone-50 border-stone-100"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className={`mt-0.5 w-4 h-4 border transition-all flex-shrink-0 flex items-center justify-center rounded ${
                        termsAccepted
                          ? "bg-emerald-900 border-emerald-900"
                          : errors.terms
                          ? "border-red-400 bg-white"
                          : "border-stone-300 bg-white group-hover:border-stone-400"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTerms();
                      }}
                    >
                      {termsAccepted && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      {...register("terms", {
                        required: "You must agree to the Terms & Conditions.",
                      })}
                    />
                    <div
                      className="text-xs text-stone-500 leading-relaxed font-medium select-none"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTerms();
                      }}
                    >
                      I agree to the{" "}
                      <Link
                        href="/term-condition"
                        className="text-emerald-900 font-bold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-emerald-900 font-bold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </label>
                  {errors.terms && (
                    <div className="flex items-center gap-2 mt-2 ml-7 text-red-600 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <p className="text-[11px] font-bold uppercase tracking-wide">
                        {errors.terms.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Global API Error */}
                {errors.root && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 font-bold text-xs">
                      !
                    </div>
                    {errors.root.message}
                  </div>
                )}

                {/* CTA Button - Disabled if terms not accepted */}
                <button
                  type="submit"
                  disabled={isRegisterLoading || !termsAccepted}
                  className="w-full bg-emerald-950 text-white h-14 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isRegisterLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Social Login Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Or register with
                    </span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="h-12 border border-stone-200 rounded-xl flex items-center justify-center gap-3 hover:bg-stone-50 transition-all group"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      alt="Google"
                    />
                    <span className="text-sm font-bold text-stone-600">
                      Google
                    </span>
                  </button>
                  <button
                    type="button"
                    className="h-12 border border-stone-200 rounded-xl flex items-center justify-center gap-3 hover:bg-stone-50 transition-all group"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      alt="Facebook"
                    />
                    <span className="text-sm font-bold text-stone-600">
                      Facebook
                    </span>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-2">
                  <p className="text-stone-500 text-sm">
                    Already have an account?
                    <a
                      href="/login"
                      className="text-emerald-900 font-bold ml-1 hover:underline decoration-2 underline-offset-4 decoration-emerald-900/20"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="py-6 w-full text-center">
            <p className="text-stone-300 text-xs font-medium">
              © 2025 Krambica Fashion.
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
