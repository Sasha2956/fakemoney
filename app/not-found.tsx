import { cn } from "@/lib/utils";
import Link from "next/link";
import { Harmattan } from "next/font/google";
import { Navbar } from "@/components/navbar";

const font = Harmattan({
  subsets: ["latin"],
  weight: ["400"],
});

export default function NotFoundPage() {
  return (
    <main className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow flex-col gap-2 justify-center items-center">
        <h3 className={cn("sm:text-3xl", font.className)}>fakemoney.</h3>
        <p className="text-muted-foreground dark:text-gray-300">
          Page not found.
        </p>

        <Link href="/" className="text-blue-500 underline hover:font-bold">
          Go to home
        </Link>
      </div>
    </main>
  );
}
