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
import { Check, AlertCircle } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all fields
      const validatedData = formSchema.parse(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success state
      setIsSuccess(true);
      setErrors({});

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
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-600 text-center my-6 hover:text-4xl hover:text-slate-800 font-bold mb-6">
                Login
              </CardTitle>
              <CardDescription className="text-sm text-center text-gray-500 text-nowrap">
                Enter any email and password to access your account...
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
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription>Login successful!</AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full h-20 mt-8 text-xl bg-slate-950 hover:bg-indigo-800 hover:text-2xl"
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
