import { Button } from "@/components/ui/button";
import React from "react";

function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Main Content</h1>
      <p className="mb-4">
        This panel takes up 2/3 of the width and full height.
      </p>
      <p className="mb-6">
        This is a Next.js application with Docker, shadcn/ui, and Tailwind CSS.
      </p>
      <div className="container mx-auto">
        <div className="flex items-center justify-center h-screen">
          <div className="flex-row min-w-full my-6 bg-slate-300/40 p-6 border-slate-400/5 border shadow-2xl rounded-r-full pl-5">
            <div className="flex-col">
              <Button variant="default" className="ml-5 my-5 w-1/2">
                Login
              </Button>
            </div>
            <div className="flex-col">
              <Button variant="secondary" className="ml-5 my-5 w-1/2">
                Register
              </Button>
            </div>
            <div className="flex m-5">
              <div className="flex-col">
                <h1 className="text-3xl font-bold mb-6">Main Content</h1>
                <p className="mb-4">
                  This panel takes up 2/3 of the width and full height.
                </p>
                <p className="mb-6">
                  This is a Next.js application with Docker, shadcn/ui, and
                  Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
