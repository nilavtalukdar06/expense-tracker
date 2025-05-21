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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        <AlertDialog>
          <AlertDialogTrigger
            className={`group flex h-9 items-center gap-2 rounded-full pl-4 pr-5 text-sm font-medium ring-1 ring-inset transition-all cursor-pointer
                ${
                  isMember
                    ? "bg-[#3fcf8e]/10 text-[#34b27b] ring-[#34b27b]/20 hover:bg-[#34b27b]/20"
                    : "bg-red-500/10 text-red-500 ring-red-500/20 hover:bg-red-500/20"
                }
              `}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                isMember ? "bg-[#3fcf8e]" : "bg-red-500"
              }`}
            />
            {isMember ? "Subscriber" : "Subscribe"}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Become a premium member</AlertDialogTitle>
              <AlertDialogDescription>
                Get AI powered financial advice and budget description
                generation at just rupees 49&#8377;
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b]">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          className="bg-[#3fcf8e] border-[#34b27b] hover:bg-[#34b27b] max-sm:hidden"
          onClick={logout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 border rounded sm:hidden cursor-pointer ml-4">
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
