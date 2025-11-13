"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { shortenUrl } from "../lib/api";
import Header from "@/components/common/Header";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const token = Cookies.get("authToken");
      const res = await shortenUrl(url, token);
      if (res.data.success) {
        setShortUrl(res.data.shortId);
        toast.success("URL shortened successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Header />

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
          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-gray-600 text-sm font-medium">
               Your shortened URL:
            </p>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm">
              <span className="font-medium text-gray-800">
                {process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT}/{shortUrl}
              </span>

              <Button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT}/${shortUrl}`
                  )
                }
                className="px-2 py-1 text-xs"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
