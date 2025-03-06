"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

function LoginComponent() {
  // Define the validation schema with Zod
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  type FormData = z.infer<typeof formSchema>;

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateField = (field: keyof FormData, value: string) => {
    try {
      // Validate just this field using the schema
      formSchema.shape[field].parse(value);
      // If it passes, remove any errors for this field
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      // If validation fails, set the error message
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name as keyof FormData, value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      const validatedData = formSchema.parse(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const loginEmail = formData.email === "sample@gmail.com";
      const loginPassword = formData.password === "password";

      if (!loginEmail) {
        setErrors({ email: "Email not found" });
        return;
      } else if (!loginPassword) {
        setErrors({ password: "Incorrect password" });
        return;
      } else {
        // Success state
        setIsSuccess(true);
        setErrors({});
      }

      // In a real app, you would handle login logic here
      console.log("Form submitted successfully", validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to our errors state
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center justify-center my-8">
          <Card className="w-full max-w-3/4">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-600 text-center my-6 hover:text-4xl hover:text-slate-800 font-bold mb-6">
                Login
              </CardTitle>
              <CardDescription className="text-sm text-center text-gray-500 text-nowrap">
                <div className="flex flex-col p-3">
                  <h3 className="text-xl my-3">
                    Login via email and password. Use the following credentials
                    to test:
                  </h3>
                  <pre className="flex bg-slate-300 text-black p-3 my-4 h-20 items-center justify-center rounded-md">
                    <code>
                      {JSON.stringify({
                        email: "sample@gmail.com",
                        password: "password",
                      })}
                    </code>
                  </pre>
                </div>
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Error Alert */}
                {Object.keys(errors).length > 0 &&
                  !errors.email &&
                  !errors.password && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.form || "Please fix the errors in the form"}
                      </AlertDescription>
                    </Alert>
                  )}
                {/* Success Alert */}
                {isSuccess && (
                  <Alert className="h-12 bg-green-50 text-green-800 border-green-200">
                    <Check className="w-4 text-green-600 text-2xl" />
                    <AlertDescription>Login successful!</AlertDescription>
                  </Alert>
                )}
                {/* Email Field */}
                <div className="space-y-2 text-3xl">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-9 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                {/* Password Field with Toggle */}
                <div className="space-y-2 text-3xl">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-9 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      <div className="flex justify-center items-center mt-2">
                        {showPassword ? (
                          <EyeOff size={24} />
                        ) : (
                          <Eye size={24} />
                        )}
                      </div>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full h-20 mt-8 text-xl bg-slate-950 hover:bg-indigo-800 hover:text-4xl"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
