import Link from "next/link";

export default function LoginHeader() {
    return (
        <>
         <header className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center w-full px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-gray-900 tracking-tight">
        LinkSnap
        </Link>

        {/* Navigation */}
        <nav>
  <ul className="flex items-center space-x-8">
    <li>
      <Link
        href="/register"
        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
      >
        Register
      </Link>
    </li>

    {/* Login Button with tight border */}
    <li className="pl-6 border-l border-gray-300">
      <Link
        href="/login"
        className="font-bold text-blue-600 hover:text-blue-700 text-sm"
      >
        Login
      </Link>
    </li>
  </ul>
</nav>

      </div>
    </header>
        </>
    )
}