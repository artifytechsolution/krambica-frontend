"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaUser,
  FaMapMarkerAlt,
  FaLock,
  FaTruck,
  FaCheckCircle,
  FaCheck,
  FaShieldAlt,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";
import { useAddAddress } from "@src/hooks/apiHooks";

// ==========================================
// VALIDATION SCHEMA WITH CUSTOM ERROR MESSAGES
// ==========================================
const checkoutSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),

  email: yup
    .string()
    .required("Email address is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    ),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .length(10, "Phone number must be exactly 10 digits"),

  address1: yup
    .string()
    .required("Address line 1 is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must not exceed 100 characters"),

  address2: yup.string().max(100, "Address must not exceed 100 characters"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "City name should only contain letters"),

  state: yup.string().required("Please select a state"),

  pincode: yup
    .string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
    .length(6, "PIN code must be exactly 6 digits"),

  saveAddress: yup.boolean(),
});

// ==========================================
// ERROR TYPES FOR TYPE-SAFE ERROR HANDLING
// ==========================================
interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

interface FormError {
  type: "validation" | "network" | "server" | "unknown";
  message: string;
  field?: string;
}

const CheckoutPage = () => {
  const user = useAppSelector(selectUser);

  // ==========================================
  // FORM STATE MANAGEMENT
  // ==========================================
  const methods = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      saveAddress: false,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, touchedFields, isValid },
  } = methods;

  // ==========================================
  // MUTATION HOOK WITH ERROR HANDLING
  // ==========================================
  const {
    isError: isAddAddressError,
    isLoading: isAddAddressLoading,
    isSuccess: isAddAddressSuccess,
    data: AddAddressData,
    error: AddAddressError,
    mutateAsync: AddAddressMutateAsync,
    reset: resetMutation,
  } = useAddAddress();

  // ==========================================
  // LOCAL ERROR STATE
  // ==========================================
  const [formErrors, setFormErrors] = useState<FormError[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const indianStates = [
    { code: "AN", name: "Andaman and Nicobar Islands" },
    { code: "AP", name: "Andhra Pradesh" },
    { code: "AR", name: "Arunachal Pradesh" },
    { code: "AS", name: "Assam" },
    { code: "BR", name: "Bihar" },
    { code: "CH", name: "Chandigarh" },
    { code: "CT", name: "Chhattisgarh" },
    { code: "DN", name: "Dadra and Nagar Haveli" },
    { code: "DD", name: "Daman and Diu" },
    { code: "DL", name: "Delhi" },
    { code: "GA", name: "Goa" },
    { code: "GJ", name: "Gujarat" },
    { code: "HR", name: "Haryana" },
    { code: "HP", name: "Himachal Pradesh" },
    { code: "JK", name: "Jammu and Kashmir" },
    { code: "JH", name: "Jharkhand" },
    { code: "KA", name: "Karnataka" },
    { code: "KL", name: "Kerala" },
    { code: "LA", name: "Ladakh" },
    { code: "LD", name: "Lakshadweep" },
    { code: "MP", name: "Madhya Pradesh" },
    { code: "MH", name: "Maharashtra" },
    { code: "MN", name: "Manipur" },
    { code: "ML", name: "Meghalaya" },
    { code: "MZ", name: "Mizoram" },
    { code: "NL", name: "Nagaland" },
    { code: "OR", name: "Odisha" },
    { code: "PY", name: "Puducherry" },
    { code: "PB", name: "Punjab" },
    { code: "RJ", name: "Rajasthan" },
    { code: "SK", name: "Sikkim" },
    { code: "TN", name: "Tamil Nadu" },
    { code: "TG", name: "Telangana" },
    { code: "TR", name: "Tripura" },
    { code: "UP", name: "Uttar Pradesh" },
    { code: "UT", name: "Uttarakhand" },
    { code: "WB", name: "West Bengal" },
  ];

  const [pricing] = useState({
    subtotal: 8497.0,
    discount: 0.0,
    shipping: 0,
    tax: 1529.46,
    total: 10026.46,
  });

  const totalItems = 3;

  const formatPincode = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 6);
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").substring(0, 10);
  };

  // ==========================================
  // PARSE API ERROR RESPONSE
  // ==========================================
  const parseApiError = (error: any): FormError[] => {
    const formErrors: FormError[] = [];

    console.log("🔍 Parsing API Error:", error);

    // Network error (no response from server)
    if (!error.response) {
      formErrors.push({
        type: "network",
        message:
          "Network error. Please check your internet connection and try again.",
      });
      return formErrors;
    }

    const statusCode = error.response?.status;
    const errorData = error.response?.data;

    // Handle different HTTP status codes
    switch (statusCode) {
      case 400: // Bad Request - Validation errors
        formErrors.push({
          type: "validation",
          message:
            errorData?.message || "Please check your input and try again.",
        });

        // Handle field-specific validation errors
        if (errorData?.errors) {
          Object.entries(errorData.errors).forEach(([field, messages]) => {
            const fieldMessages = Array.isArray(messages)
              ? messages
              : [messages];
            fieldMessages.forEach((msg: string) => {
              formErrors.push({
                type: "validation",
                message: msg,
                field,
              });

              // Set error on specific field
              setError(field as any, {
                type: "server",
                message: msg,
              });
            });
          });
        }
        break;

      case 401: // Unauthorized
        formErrors.push({
          type: "server",
          message: "Your session has expired. Please log in again.",
        });
        // Redirect to login
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        break;

      case 403: // Forbidden
        formErrors.push({
          type: "server",
          message:
            "You don't have permission to perform this action. Please contact support.",
        });
        break;

      case 404: // Not Found
        formErrors.push({
          type: "server",
          message: "The requested resource was not found. Please try again.",
        });
        break;

      case 409: // Conflict - Duplicate data
        formErrors.push({
          type: "validation",
          message:
            errorData?.message ||
            "This address already exists in your account.",
        });
        break;

      case 422: // Unprocessable Entity
        formErrors.push({
          type: "validation",
          message:
            errorData?.message ||
            "The data provided could not be processed. Please check your input.",
        });
        break;

      case 429: // Too Many Requests
        formErrors.push({
          type: "server",
          message:
            "Too many requests. Please wait a moment before trying again.",
        });
        break;

      case 500: // Internal Server Error
      case 502: // Bad Gateway
      case 503: // Service Unavailable
      case 504: // Gateway Timeout
        formErrors.push({
          type: "server",
          message:
            "Server error. Our team has been notified. Please try again later.",
        });
        break;

      default:
        formErrors.push({
          type: "unknown",
          message:
            errorData?.message ||
            "An unexpected error occurred. Please try again.",
        });
    }

    return formErrors;
  };

  // ==========================================
  // HANDLE MUTATION SUCCESS
  // ==========================================
  useEffect(() => {
    if (isAddAddressSuccess && AddAddressData) {
      console.log("✅ Address added successfully:", AddAddressData);

      // Clear any previous errors
      setFormErrors([]);
      clearErrors();

      // Show success message
      setShowSuccessMessage(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      // Proceed to next step (payment gateway, order confirmation, etc.)
      // router.push('/payment');
    }
  }, [isAddAddressSuccess, AddAddressData, clearErrors]);

  // ==========================================
  // HANDLE MUTATION ERROR
  // ==========================================
  useEffect(() => {
    if (isAddAddressError && AddAddressError) {
      console.error("❌ Address addition failed:", AddAddressError);

      const parsedErrors = parseApiError(AddAddressError);
      setFormErrors(parsedErrors);

      // Scroll to error message
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Log error for monitoring (send to Sentry, LogRocket, etc.)
      // logErrorToMonitoring(AddAddressError);
    }
  }, [isAddAddressError, AddAddressError]);

  // ==========================================
  // DISMISS ERROR MESSAGE
  // ==========================================
  const dismissError = (index: number) => {
    setFormErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const dismissAllErrors = () => {
    setFormErrors([]);
    clearErrors();
    resetMutation();
  };

  // ==========================================
  // FORM SUBMISSION WITH COMPREHENSIVE ERROR HANDLING
  // ==========================================
  const onSubmit = async (data: any) => {
    console.log("==========================================");
    console.log("📝 FORM SUBMISSION STARTED");
    console.log("==========================================");
    console.log("Form Data:", data);

    // Clear previous errors
    setFormErrors([]);
    clearErrors();

    try {
      if (data.saveAddress) {
        const addressPayload = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          addressLine1: data.address1,
          addressLine2: data.address2 || "",
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: "India",
          isDefault: false,
        };
        const { firstName, lastName, ...otherpayload } = addressPayload;

        console.log("📦 Sending address payload:", addressPayload);

        // Attempt mutation with try-catch for immediate error handling
        const result = await AddAddressMutateAsync({
          fullName: `${addressPayload.firstName}${addressPayload.lastName}`,
          otherpayload,
        });

        console.log("✅ Address saved successfully:", result);

        // Success - proceed to next step
        // You can add navigation logic here
        // router.push('/payment');
      } else {
        console.log("⏭️ Skipping address save, proceeding to payment...");

        // Proceed directly to payment without saving address
        // router.push('/payment');
      }
    } catch (error: any) {
      console.error("❌ Checkout error:", error);

      // Parse and display errors
      const parsedErrors = parseApiError(error);
      setFormErrors(parsedErrors);

      // Additional error logging for debugging
      if (process.env.NODE_ENV === "development") {
        console.error("Full error object:", error);
        console.error("Error response:", error.response);
      }

      // Re-throw error for React Query to handle
      throw error;
    } finally {
      console.log("==========================================\n");
    }
  };

  // ==========================================
  // HANDLE FORM ERRORS (VALIDATION ERRORS)
  // ==========================================
  const onError = (errors: any) => {
    console.error("🚫 Form validation errors:", errors);

    const validationErrors: FormError[] = Object.entries(errors).map(
      ([field, error]: [string, any]) => ({
        type: "validation",
        message: error.message,
        field,
      })
    );

    setFormErrors(validationErrors);

    // Scroll to first error
    const firstErrorField = Object.keys(errors)[0];
    const element = document.querySelector(`[name="${firstErrorField}"]`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ==========================================
  // HANDLE FORM SUBMIT BUTTON CLICK
  // ==========================================
  const handleFormSubmit = () => {
    handleSubmit(onSubmit, onError)();
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className="mb-8 rounded-2xl p-8 shadow-lg relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #2E6A64 0%, #3a8077 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Secure Checkout
              </h1>
              <p className="text-white/90">Complete your purchase securely</p>
            </div>
          </div>

          {/* ==========================================
              SUCCESS MESSAGE BANNER
              ========================================== */}
          {showSuccessMessage && (
            <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-500 rounded-xl shadow-md animate-fadeIn">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-1">
                    Address Saved Successfully! 🎉
                  </h3>
                  <p className="text-green-800 text-sm">
                    Your shipping address has been saved to your account.
                    Proceeding to payment...
                  </p>
                </div>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="text-green-600 hover:text-green-800 transition"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* ==========================================
              ERROR MESSAGE BANNER WITH TYPE-SPECIFIC STYLING
              ========================================== */}
          {formErrors.length > 0 && (
            <div className="mb-6 space-y-3">
              {formErrors.map((error, index) => {
                const getErrorStyle = () => {
                  switch (error.type) {
                    case "validation":
                      return {
                        bg: "bg-amber-50",
                        border: "border-amber-500",
                        text: "text-amber-900",
                        icon: "text-amber-600",
                      };
                    case "network":
                      return {
                        bg: "bg-red-50",
                        border: "border-red-500",
                        text: "text-red-900",
                        icon: "text-red-600",
                      };
                    case "server":
                      return {
                        bg: "bg-orange-50",
                        border: "border-orange-500",
                        text: "text-orange-900",
                        icon: "text-orange-600",
                      };
                    default:
                      return {
                        bg: "bg-red-50",
                        border: "border-red-500",
                        text: "text-red-900",
                        icon: "text-red-600",
                      };
                  }
                };

                const styles = getErrorStyle();

                return (
                  <div
                    key={index}
                    className={`p-5 ${styles.bg} border-2 ${styles.border} rounded-xl shadow-md animate-slideDown`}
                  >
                    <div className="flex items-start gap-3">
                      <FaExclamationCircle
                        className={`${styles.icon} text-2xl flex-shrink-0 mt-0.5`}
                      />
                      <div className="flex-1">
                        <h3 className={`font-bold ${styles.text} mb-1`}>
                          {error.type === "validation" && "Validation Error"}
                          {error.type === "network" && "Connection Error"}
                          {error.type === "server" && "Server Error"}
                          {error.type === "unknown" && "Error"}
                        </h3>
                        <p className={`${styles.text} text-sm`}>
                          {error.message}
                        </p>
                        {error.field && (
                          <p
                            className={`${styles.text} text-xs mt-1 opacity-75`}
                          >
                            Field: {error.field}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => dismissError(index)}
                        className={`${styles.icon} hover:opacity-70 transition`}
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Dismiss All Button */}
              {formErrors.length > 1 && (
                <button
                  onClick={dismissAllErrors}
                  className="w-full py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
                >
                  Dismiss All Errors
                </button>
              )}
            </div>
          )}

          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="flex flex-col items-center flex-1 relative">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-green-500 text-white shadow-lg relative z-10">
                <FaCheck className="w-6 h-6" />
              </div>
              <span className="mt-2 text-sm font-semibold text-green-600 text-center">
                Shopping Cart
              </span>
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-green-500 z-0"></div>
            </div>
            <div className="flex flex-col items-center flex-1 relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-lg relative z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #2E6A64 0%, #3a8077 100%)",
                }}
              >
                2
              </div>
              <span className="mt-2 text-sm font-semibold text-teal-700 text-center">
                Checkout Details
              </span>
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
            </div>
            <div className="flex flex-col items-center flex-1 relative">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gray-300 text-gray-600 relative z-10">
                3
              </div>
              <span className="mt-2 text-sm font-semibold text-gray-500 text-center">
                Order Complete
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaUser className="text-teal-700" />
                    Contact Information
                  </h2>
                  <span className="text-sm text-gray-500">Step 1 of 2</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* First Name */}
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.firstName;
                      const isTouched = touchedFields.firstName;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="Enter your first name"
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "firstName-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="firstName-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {/* Last Name */}
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.lastName;
                      const isTouched = touchedFields.lastName;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="Enter your last name"
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "lastName-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="lastName-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.email;
                      const isTouched = touchedFields.email;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="email"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="your.email@example.com"
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "email-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="email-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.email?.message}
                            </p>
                          )}
                          {!hasError && (
                            <p className="text-xs text-gray-500 mt-1">
                              Order confirmation will be sent to this email
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.phone;
                      const isTouched = touchedFields.phone;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="tel"
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value);
                                setValue("phone", formatted, {
                                  shouldValidate: true,
                                  shouldTouch: true,
                                });
                              }}
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="10-digit mobile number"
                              maxLength={10}
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "phone-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="phone-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.phone?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-teal-700" />
                  Shipping Address
                </h2>

                {/* Address Line 1 */}
                <div className="mb-4">
                  <Controller
                    name="address1"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.address1;
                      const isTouched = touchedFields.address1;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            Address Line 1{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="House/Flat number, Street name"
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "address1-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="address1-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.address1?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                {/* Address Line 2 */}
                <div className="mb-4">
                  <Controller
                    name="address2"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.address2;
                      const isTouched = touchedFields.address2;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            Address Line 2
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="Apartment, suite, etc. (optional)"
                              aria-invalid={hasError ? "true" : "false"}
                            />
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.address2?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* City */}
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.city;
                      const isTouched = touchedFields.city;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            City <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="City"
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "city-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="city-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.city?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {/* State */}
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.state;
                      const isTouched = touchedFields.state;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            State <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              {...field}
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition bg-white appearance-none ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "state-error" : undefined
                              }
                            >
                              <option value="">Select State</option>
                              {indianStates.map((state) => (
                                <option key={state.code} value={state.code}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="state-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.state?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* PIN Code */}
                  <Controller
                    name="pincode"
                    control={control}
                    render={({ field }) => {
                      const hasError = errors.pincode;
                      const isTouched = touchedFields.pincode;
                      return (
                        <div>
                          <label className="block font-semibold text-gray-800 mb-2 text-sm">
                            PIN Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                const formatted = formatPincode(e.target.value);
                                setValue("pincode", formatted, {
                                  shouldValidate: true,
                                  shouldTouch: true,
                                });
                              }}
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                                hasError
                                  ? "border-red-500 focus:border-red-600 bg-red-50"
                                  : isTouched && field.value
                                  ? "border-green-500 focus:border-green-600 bg-green-50"
                                  : "border-gray-200 focus:border-teal-700"
                              }`}
                              placeholder="400001"
                              maxLength={6}
                              aria-invalid={hasError ? "true" : "false"}
                              aria-describedby={
                                hasError ? "pincode-error" : undefined
                              }
                            />
                            {hasError && (
                              <FaExclamationCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" />
                            )}
                            {!hasError && isTouched && field.value && (
                              <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {hasError && (
                            <p
                              id="pincode-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <FaExclamationCircle className="flex-shrink-0" />
                              {errors.pincode?.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {/* Country */}
                  <div>
                    <label className="block font-semibold text-gray-800 mb-2 text-sm">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                      value="India"
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                {/* Save Address Checkbox */}
                <div className="mt-6 pt-6 border-t">
                  <Controller
                    name="saveAddress"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...field}
                          checked={field.value}
                          className="w-5 h-5 text-teal-700 rounded border-gray-300 focus:ring-teal-700 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-teal-700 transition">
                          Save this address for future orders
                        </span>
                      </label>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-200 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">
                      ₹{pricing.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      -₹{pricing.discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span className="font-semibold">
                      ₹{pricing.tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="mb-6 pb-6 border-b">
                  <div className="flex justify-between text-2xl font-bold text-gray-900 mb-2">
                    <span>Total</span>
                    <span className="text-teal-700">
                      ₹{pricing.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* ==========================================
                    PLACE ORDER BUTTON WITH ERROR HANDLING
                    ========================================== */}
                <button
                  onClick={handleFormSubmit}
                  disabled={isAddAddressLoading}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition mb-4 flex items-center justify-center gap-2 shadow-md ${
                    isAddAddressLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-700 text-white hover:bg-teal-800 hover:shadow-lg active:scale-95"
                  }`}
                  aria-busy={isAddAddressLoading}
                >
                  {isAddAddressLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock className="w-5 h-5" />
                      Place Order Securely
                    </>
                  )}
                </button>

                <a
                  href="/cart"
                  className="block text-center text-teal-700 font-semibold hover:underline mb-6 transition"
                >
                  ← Back to Cart
                </a>

                {/* Trust Badges */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <FaShieldAlt className="text-green-600 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        100% Secure Payment
                      </p>
                      <p className="text-xs text-gray-600">
                        SSL encrypted checkout
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <FaTruck className="text-green-600 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Free Shipping
                      </p>
                      <p className="text-xs text-gray-600">
                        On orders over ₹6,225
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Easy Returns
                      </p>
                      <p className="text-xs text-gray-600">
                        30 days return policy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    We Accept
                  </p>
                  <div className="flex justify-center gap-3 flex-wrap">
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-bold text-gray-700">
                      VISA
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-bold text-gray-700">
                      MASTERCARD
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-bold text-gray-700">
                      UPI
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-bold text-gray-700">
                      NET BANKING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          ADD THESE ANIMATIONS TO YOUR TAILWIND CONFIG
          ========================================== */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </FormProvider>
  );
};

export default CheckoutPage;
