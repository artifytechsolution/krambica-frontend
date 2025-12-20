"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useUserLogin } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "@src/redux/reducers/authSlice";
import { Mail, Lock, ArrowRight, Check } from "lucide-react";
import CustomInput from "@src/component/customeFormField";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);

  // 1. Setup Form with default 'terms: false'
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
    mode: "onSubmit", // Validate on submit for strict enforcement
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

  // 2. Watch terms state for the custom visual checkbox
  const termsAccepted = watch("terms");

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError,
    mutate: login,
  } = useUserLogin();

  // 3. Handle API Response
  useEffect(() => {
    if (loginData && !isLoginLoading) {
      dispatch(setAuthToken(loginData.data.token));
      dispatch(setUser(loginData?.data?.user));
      toast.success(loginData?.message ?? "Login Successful");
      reset();
      router?.push("/home");
    }
    if (isLoginError && loginError) {
      // Show server error in the form, not a toast popup
      setError("root", {
        type: "server",
        message: loginError?.message || "Login failed",
      });
    }
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

  // 4. Submit Handler (Only runs if validation passes)
  const onSubmit = async (data) => {
    clearErrors("root");
    try {
      // Remove 'terms' from the payload sent to the backend
      const { terms, ...loginPayload } = data;
      login(loginPayload);
    } catch (err) {
      toast.error("Unexpected error.");
    }
  };

  // Helper to toggle terms manually
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

        /* Custom Scrollbar for Right Panel */
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
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-12 left-12 text-white p-8 max-w-lg">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-90">
              The Ethnic Edit
            </p>
            <h2 className="font-serif text-5xl leading-tight mb-6">
              "Elegance is the only beauty that never fades."
            </h2>
            <div className="h-px w-20 bg-white/60" />
          </div>
        </div>

        {/* --- RIGHT SIDE: Login Form --- */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col relative bg-white h-full overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="absolute top-8 left-8 lg:top-10 lg:left-12 z-20">
            <span className="font-serif text-2xl font-bold text-emerald-950 tracking-wide cursor-pointer">
              Krambica.
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-28 py-20">
            <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Header */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 leading-tight">
                  Welcome back
                </h1>
                <p className="text-stone-500 text-sm lg:text-base font-sans font-light tracking-wide">
                  Enter your credentials to access your account.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="w-full h-14 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      }}
                    />
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-widest">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors underline-offset-4 hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative group transition-all duration-300">
                    <CustomInput
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-14 bg-stone-50 border border-transparent focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-xl px-4 transition-all outline-none placeholder:text-stone-400 text-stone-900 font-medium pl-11"
                      rules={{
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 chars" },
                      }}
                    />
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-800 transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Remember Me Toggle */}
                <div className="flex items-center pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <div
                      className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        rememberMe
                          ? "bg-emerald-900 border-emerald-900"
                          : "border-stone-300 bg-white group-hover:border-stone-400"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 text-white transform transition-transform ${
                          rememberMe ? "scale-100" : "scale-0"
                        }`}
                        strokeWidth={3}
                      />
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                      Keep me signed in
                    </span>
                  </label>
                </div>

                {/* --- REQUIRED Terms & Conditions --- */}
                {/* Visual Feedback: If error exists, border turns Red */}
                <div
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    errors.terms
                      ? "bg-red-50 border-red-200"
                      : "bg-stone-50 border-stone-100"
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer group">
                    {/* Visual Custom Checkbox */}
                    <div
                      className={`mt-0.5 w-4 h-4 border transition-all flex-shrink-0 flex items-center justify-center rounded ${
                        termsAccepted
                          ? "bg-emerald-900 border-emerald-900"
                          : errors.terms
                          ? "border-red-400 bg-white"
                          : "border-stone-300 bg-white group-hover:border-stone-400"
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent double toggling with label
                        toggleTerms();
                      }}
                    >
                      {termsAccepted && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>

                    {/* Hidden Native Input linked to React Hook Form */}
                    <input
                      type="checkbox"
                      className="hidden"
                      {...register("terms", {
                        required:
                          "You must agree to the Terms & Conditions to sign in.",
                      })}
                    />

                    <div
                      className="text-xs text-stone-500 leading-relaxed font-medium select-none"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTerms();
                      }}
                    >
                      By logging in, I agree to the{" "}
                      <Link
                        href="/term-condition"
                        className="text-emerald-900 font-bold hover:underline"
                        onClick={(e) => e.stopPropagation()} // Allow link click without toggling
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-emerald-900 font-bold hover:underline"
                        onClick={(e) => e.stopPropagation()} // Allow link click without toggling
                      >
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </label>

                  {/* Validation Error Message */}
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

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isLoginLoading}
                  className="w-full bg-emerald-950 text-white h-14 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black hover:shadow-lg hover:shadow-emerald-900/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoginLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Register Link */}
                <div className="text-center pt-2">
                  <p className="text-stone-500 text-sm">
                    Don't have an account?
                    <a
                      href="/signup"
                      className="text-emerald-900 font-bold ml-1 hover:underline decoration-2 underline-offset-4 decoration-emerald-900/20"
                    >
                      Create account
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
