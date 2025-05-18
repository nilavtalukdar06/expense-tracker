"use client";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";

export default function Home() {
  return (
    <section className="p-4">
      <Button
        variant="outline"
        onClick={async () => await supabase.auth.signOut()}
      >
        Log Out
      </Button>
      <h1 className="my-2">Expensify</h1>
    </section>
  );
}
