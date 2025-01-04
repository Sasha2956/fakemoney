import Link from "next/link";
import { Button } from "./ui/button";
import { Harmattan } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "./auth/user-button";
import { auth } from "@/auth";

const font = Harmattan({
  subsets: ["latin"],
  weight: ["400"],
});

interface NavbarProps {
  className?: string
}

export const Navbar = async ({ className }: NavbarProps) => {
  const session = await auth();

  return (
    <header className={cn("flex items-center justify-between py-7", className)}>
      <Link href="/">
        {" "}
        <h3 className={cn("text-xl sm:text-3xl", font.className)}>
          fakemoney.
        </h3>
      </Link>
      {session?.user ? (
        <UserButton />
      ) : (
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      )}
    </header>
  );
};
