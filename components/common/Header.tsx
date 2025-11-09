"use client"

import { LogOut } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import {useRouter } from "next/navigation";


export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove("authToken", {
          domain:process.env.NEXT_PUBLIC_BASE_URL_FRONT_URL,
          path: "/",
        });
        router.replace("/login"); 
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
      <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
          <LogOut size={18} />
          Logout
          </button>
      </li>
    </ul>
  </nav>
</div>
</header>
        </>
    )
}

