"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { useState } from "react";

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const [error, setError] = useState<Promise<string | undefined>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const result = register(values);
    setError(result);
    setIsLoading(false);
  };

  return (
    <Card className="w-screen sm:w-[600px] max-sm:rounded-none max-sm:h-screen">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Button className="w-full" disabled={isLoading} isLoading={isLoading}>Submit</Button>
            {error && (
              <div className="bg-red-700/15 text-destructive flex justify-center p-4 rounded-md gap-2 border border-destructive">
                <TriangleAlertIcon />
                <p>{error}</p>
              </div>
            )}
          </form>
        </Form>
        <div className="relative border-b">
          <p className="absolute left-1/2 top-1/2 px-4 bg-card transform -translate-x-1/2 -translate-y-1/2">
            or
          </p>
        </div>
        <Button className="w-full" variant="outline" onClick={onClick}>
          <Github />
          Sign in with GitHub
        </Button>

        <div className="justify-center flex gap-2">
          <p>Already have an account</p>
          <Link href="/login" className="hover:font-bold text-blue-500 underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
