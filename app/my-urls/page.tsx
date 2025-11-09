"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchUrls } from "../lib/api";
import Cookies from "js-cookie";
import { Url } from "../lib/types/Url";
import Header from "@/components/common/Header";

export default function MyUrls() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber = 1, limit = 10) => {
    const token = Cookies.get("authToken");
    const res = await fetchUrls(pageNumber, limit, token);

    if (res?.data?.urls) {
      setUrls(res.data.urls);
      setTotalPages(res.data.totalPages || 1);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
      <Header/>

      {/* Body */}
      <div className="pt-28 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Your Shortened URLs</h2>

        <div className="bg-white shadow-md rounded-lg p-5">
          {urls.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No URLs shortened yet 😅
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-2">Short URL</th>
                  <th className="py-2">Long URL</th>
                  <th className="py-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {urls.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-medium text-blue-600">
                      {process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT}/{item.shortId}
                    </td>
                    <td className="py-2 text-sm truncate max-w-xs">
                      {item.longUrl}
                    </td>
                    <td className="py-2 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${process.env.NEXT_PUBLIC_BASE_URL_BACKENDAPI_REDIRECT}/${item.shortId}`
                          )
                        }
                      >
                        Copy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="secondary"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="secondary"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
