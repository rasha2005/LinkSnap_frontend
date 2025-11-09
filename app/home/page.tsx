"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { shortenUrl } from "../lib/api";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const token = Cookies.get("authToken");
      const res = await shortenUrl(url,token);
      if(res.data.success) {
        setShortUrl(res.data.shortId)
        // toast.success("URL Shortened!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
   <header className="w-full bg-white shadow-md fixed top-0 z-50">
  <div className="flex justify-between items-center w-full px-6 py-4">
    
    {/* Logo */}
    <Link href="/home" className="text-xl font-extrabold text-gray-900 tracking-tight">
    LinkSnap
    </Link>

    {/* Navigation */}
    <nav>
      <ul className="flex items-center space-x-8">
      <li>
      <Link
        href="/my-urls"
        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
      >
        My URLs
      </Link>
    </li>
        <li>
        <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <LogOut size={18} />
            Logout
            </button>
        </li>
      </ul>
    </nav>
  </div>
</header>

{/* ✅ Page content now positioned below header */}
<main className="pt-28 flex flex-col items-center min-h-screen gap-6">
  <h1 className="text-3xl font-bold">Shorten Your URL</h1>

  <div className="flex gap-2">
    <Input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter your long URL"
      className="w-80"
    />
    <Button onClick={handleShorten}>Shorten</Button>
  </div>

  {shortUrl && (
  <div className="flex items-center gap-2 mt-3">
    <span className="font-medium text-gray-800">
     {process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT }/{shortUrl}
    </span>

    <Button
      type="button"
      onClick={() =>
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT }/${shortUrl}`
        )
      }
      className="px-2 py-1 text-xs"
    >
      Copy
    </Button>
  </div>
)}

</main>

    </>
  );
}
