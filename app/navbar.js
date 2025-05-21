"use client";
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import SessionContext from "@/context/session-context";

export default function Navbar() {
  const session = useContext(SessionContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const checkUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session?.user?.id);
      if (error) {
        throw new Error(error.message);
      } else {
        setIsMember(data[0].is_member);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    session?.user?.id && checkUser();
  }, [session]);

  const reload = () => {
    window.location.reload();
  };

  return (
    <header className="px-5 py-3 max-sm:py-4 border-b border-dashed flex justify-between items-center">
      <button
        className="cursor-pointer flex justify-start items-center flex-1"
        onClick={reload}
      >
        <Image src="/next.svg" alt="logo" height={30} width={100} />
      </button>

      <nav className="flex justify-center items-center gap-x-4 max-sm:hidden">
        <Link
          href="/"
          className="text-sm text-slate-800 hover:text-[#34b27b] transition-colors duration-200 ease-in-out"
        >
          Add Expense
        </Link>
        <Link
          href="/expenses"
          className="text-sm text-slate-800 hover:text-[#34b27b] transition-colors duration-200 ease-in-out"
        >
          Expenses
        </Link>
      </nav>
      <div className="flex justify-end items-center gap-x-3 flex-1">
        <button className="text-sm text-slate-600">
          {!isMember && <span>Go Premium</span>}
        </button>
        <Button
          className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] max-sm:hidden"
          onClick={logout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 border rounded sm:hidden cursor-pointer">
          <MenuIcon size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/">Add Expense</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/expenses">Expenses</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="text-sm text-slate-600">
              {!isMember && <span>Go Premium</span>}
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b]"
              onClick={logout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
