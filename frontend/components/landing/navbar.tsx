"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
<<<<<<< HEAD
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
=======
import { useRouter } from "next/navigation";

export const navItems = [
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "FAQ'S", href: "#faq's" },
];
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5

export const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
=======
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
<<<<<<< HEAD
    <header className="max-w-7xl mx-auto mt-2 md:mt-4 mb-4 rounded-full bg-primary px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Nirvana.AI Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-white font-bold text-xl">Nirvana.AI</span>
=======
    <header className="max-w-7xl mx-auto my-4 rounded-2xl bg-amber-900 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-white font-bold text-xl">Nirvana.Ai</span>
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
<<<<<<< HEAD
              <Link
                href="/dashboard"
                className="text-white text-sm hover:text-amber-200 transition"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-secondary/30 hover:bg-secondary-300 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm"
              >
=======
              <a href="/dashboard" className="text-white text-sm hover:text-amber-200 transition">
                Dashboard
              </a>
              <button type="button" onClick={handleLogout} className="bg-amber-700 cursor-pointer hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm">
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5
                Logout
              </button>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <Link
                href="/sign-in"
                className="text-white text-sm hover:text-amber-200 transition"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-secondary/30 hover:bg-secondary-300 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm"
              >
                Sign Up
              </Link>
=======
              <a href="/sign-in" className="text-white text-sm hover:text-amber-200 transition">
                Login
              </a>
              <a href="/sign-up" className="bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm">
                Sign Up
              </a>
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5
            </>
          )}
        </div>

<<<<<<< HEAD
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="lg:hidden size-10 flex flex-col justify-center items-center gap-[5px] rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-2"
            >
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-primary/95 text-white backdrop-blur-lg border-primary">
            <DrawerTitle />
            <div className="mx-auto w-full max-w-sm">
              <div className="p-6 space-y-6">
                <div className="border-white/10">
                  <div className="flex flex-col items-center gap-4">
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-white text-lg hover:text-secondary transition w-full text-center"
                          onClick={() => setOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            handleLogout();
                            setOpen(false);
                          }}
                          className="bg-secondary/30 hover:bg-secondary-300 text-white font-semibold text-lg px-4 py-2 rounded-lg transition shadow-sm w-full"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/sign-in"
                          className="text-white text-lg hover:text-secondary transition w-full text-center"
                          onClick={() => setOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/sign-up"
                          className="bg-secondary/30 hover:bg-secondary-300 text-white font-semibold text-lg px-4 py-2 rounded-lg transition shadow-sm w-full text-center"
                          onClick={() => setOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <DrawerFooter className="text-xs text-center text-white/60">
                © 2025 Nirvana.AI
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
=======
        <button type="button" className="lg:hidden size-10 flex flex-col justify-center items-center gap-[5px] rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-2">
          <div className="w-5 h-0.5 bg-white" />
          <div className="w-5 h-0.5 bg-white" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
>>>>>>> 482bae3858780d9107ccc5f3effa1797f161c3d5
      </div>
    </header>
  );
};

export default Navbar;
