"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { signup } from "@/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import Oauth from "../_components/Oauth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpSchema = z.object({
  email: z.string().min(1, "Email field required").email(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

type signInFields = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFields>({
    resolver: zodResolver(SignUpSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  async function onSubmit(data: signInFields) {
    const response = await signup(data);

    if (response.status !== 200) {
      toast.error(response.error || "Something went wrong");
      return;
    }
    toast.success("Signup successfully. Verify your email");
    router.push("/sign-in");
  }

  function error(e: string | undefined) {
    return <span className="text-xs text-red-500 ">{e}</span>;
  }

  function handlePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your email and password below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
            />
            {errors.email && error(errors?.email?.message)}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
            />
            {errors.password && error(errors?.password?.message)}
            <div
              className="text-sm flex gap-2 items-center cursor-pointer"
              onClick={handlePassword}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} Password
            </div>
          </div>

          <Button type="submit" className="w-full">
            Signup
          </Button>
          {/* <Oauth /> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
