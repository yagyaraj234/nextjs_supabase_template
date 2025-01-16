import { createClient } from "@/lib/supabase/browser-client";

interface FormData {
  email: string;
  password: string;
}

// Sign up user
export async function signup(data: FormData) {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (user) {
    await supabase.from("users").insert({
      email: data.email,
      password: data.password,
    });
    return {
      status: 200,
      data: user,
    };
  }

  return {
    status: 400,
    data: null,
    error: error?.message,
  };
}

// Sign in user
export async function signin(data: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (user) {
    return {
      status: 200,
      data: user,
    };
  }

  return {
    status: 400,
    data: null,
    error: error?.message,
  };
}
