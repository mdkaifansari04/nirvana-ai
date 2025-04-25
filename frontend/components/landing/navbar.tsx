"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const navItems = [
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "FAQ'S", href: "#faq's" },
];

export const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="max-w-7xl mx-auto my-4 rounded-2xl bg-amber-900 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-white font-bold text-xl">Nirvana.Ai</span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <a href="/dashboard" className="text-white text-sm hover:text-amber-200 transition">
                Dashboard
              </a>
              <button type="button" onClick={handleLogout} className="bg-amber-700 cursor-pointer hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/sign-in" className="text-white text-sm hover:text-amber-200 transition">
                Login
              </a>
              <a href="/sign-up" className="bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm">
                Sign Up
              </a>
            </>
          )}
        </div>

        <button type="button" className="lg:hidden size-10 flex flex-col justify-center items-center gap-[5px] rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-2">
          <div className="w-5 h-0.5 bg-white" />
          <div className="w-5 h-0.5 bg-white" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
