import { createClient } from "@/lib/supabase/browser-client";

interface Post {
  title: string;
  content: string;
  userId: string;
}

export async function createPost(data: Post) {
  const supabase = await createClient();

  const { data: post, error } = await supabase.from("posts").insert(data);

  if (error) {
    console.log("error", error);
    throw error;
  }

  return post;
}
