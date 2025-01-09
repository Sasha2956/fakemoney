import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Fakemoney"
}

export default function Home() {
  return (
    <Navbar />
  );
}
