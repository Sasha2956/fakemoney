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
import { Github, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<Promise<string | undefined>>();

  const onClick = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const result = login(values);
    setError(result);
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
            <Button className="w-full">Submit</Button>
            {error && (
              <div className="bg-red-700/15 text-destructive flex justify-center p-4 rounded-md gap-2 border border-destructive">
                <TriangleAlertIcon />
                <p>{error}</p>
              </div>
            )}
          </form>
        </Form>
        <div className="relative border-b">
          <p className="absolute left-1/2 top-1/2 px-4 bg-white transform -translate-x-1/2 -translate-y-1/2">
            or
          </p>
        </div>
        <Button className="w-full" variant="outline" onClick={onClick}>
          <Github />
          Sign in with GitHub
        </Button>

        <div className="justify-center flex gap-2">
          <p>Don{"'"}t have an account</p>
          <Link
            href="/register"
            className="hover:font-bold text-blue-500 underline"
          >
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
