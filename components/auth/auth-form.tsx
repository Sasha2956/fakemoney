"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const AuthForm = () => {
  const onClick = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };
  return (
    <Card className="w-screen sm:w-[600px] max-sm:rounded-none max-sm:h-screen">
      <CardHeader>
        <CardTitle>Let{"'"}s sign you in</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onClick}>
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
};
