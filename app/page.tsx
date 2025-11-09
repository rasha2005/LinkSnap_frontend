"use client";

import LoginHeader from "@/components/common/LoginHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> 
      
      <LoginHeader />

      <main className="flex flex-grow justify-center px-4 pt-8 pb-10">
       
        <div className="bg-white rounded-3xl shadow-2xl p-16 w-full max-w-5xl 
                      border border-gray-200 
                      flex flex-col justify-center items-center h-[500px] /* Example fixed height for demonstration */
        ">

          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Shorten Your URLs Easily 🚀
          </h1>

          <p className="text-lg text-gray-600 mt-4 mb-8 text-center">
            Clean links to simplify your sharing experience.
          </p>

          <div className="mt-8">
            <Link href="/register">
              <Button className="text-xl px-10 py-4 transition-transform hover:scale-105">
                Start Now
              </Button>
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}