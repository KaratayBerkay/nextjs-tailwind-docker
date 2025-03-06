"use server";
import React from "react";
import LoginComponent from "@/components/login";

function LoginPage() {
  return (
    <>
      <div>
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <LoginComponent />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
