"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "@/supabase/supabase";
import SessionContext from "@/context/session-context";

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const createUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session?.user?.id);
      if (error) {
        throw new Error(error.message);
      }
      if (data.length === 0) {
        try {
          const { error } = await supabase
            .from("users")
            .insert([{ user_id: session?.user?.id, is_member: false }]);
          if (error) {
            throw new Error(error.message);
          }
        } catch (error) {
          throw new Error(error);
        }
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    session && createUser();
  }, [session]);

  if (!session) {
    return (
      <main className="min-h-screen max-w-screen overflow-x-hidden relative p-4 sm:p-6">
        <section className="max-w-sm mx-auto my-20 md:my-30">
          <div className="my-8">
            <h1 className="text-center text-2xl text-slate-800 font-medium">
              Welcome to Expensify
            </h1>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
          />
        </section>
      </main>
    );
  } else {
    return (
      <SessionContext.Provider value={session}>
        {children}
      </SessionContext.Provider>
    );
  }
}
