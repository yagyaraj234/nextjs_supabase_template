import { createClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log("user", user);
  // if (user) {
  //   redirect("/dashboard");
  // }
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-black">
        {children}
      </div>
    </>
  );
}
