"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/actions/login";
import { ErrorMessage } from "../error-message";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const nextUrl = searchParams.get("next") || "/dashboard";

  const onClickGithub = () => {
    signIn("github", { callbackUrl: nextUrl });
  };

  const onClickGoogle = () => {
    signIn("google", { callbackUrl: nextUrl });
  };

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const result = await login(values);
    setError(result);
    router.push(nextUrl);
    setLoading(false);
  };

  return (
    <Card className="w-screen sm:w-[600px] max-sm:rounded-none max-sm:h-screen">
      <CardHeader>
        <CardTitle>Let{"'"}s sign you in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*****" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" isLoading={loading}>
              Submit
            </Button>
            {error && <ErrorMessage message={error} />}
          </form>
        </Form>
        <div className="relative border-b">
          <p className="absolute left-1/2 top-1/2 px-4 bg-card transform -translate-x-1/2 -translate-y-1/2">
            or
          </p>
        </div>
        <div className="space-y-2">
          <Button className="w-full" variant="outline" onClick={onClickGithub}>
            <FaGithub />
            Sign in with GitHub
          </Button>
          <Button className="w-full" variant="outline" onClick={onClickGoogle}>
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>

        <div className="justify-center flex gap-2">
          <p>Don{"'"}t have an account</p>
          <Link
            href={`/register?next=${encodeURIComponent(nextUrl)}`}
            className="hover:font-bold text-blue-500 underline"
          >
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
