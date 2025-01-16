import { createClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("first");
  const supabase = await createClient();

  // check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    //   if user present signout the user
    await supabase.auth.signOut();
  }

  // revalidate path ( this will revalidate user is not authenticated redirect to sign-in page)
  revalidatePath("/", "layout");

  return NextResponse.redirect(new URL("/sign-in", request.url), {
    status: 302,
  });
}
