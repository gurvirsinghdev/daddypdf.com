import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow w-screen h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 lg:my-24 my-12">
      <Link href={"/"}>
        <Button
          variant={"ghost"}
          className="absolute top-3 left-1.5 flex items-center flex-row gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/90 transition-all rounded hover:border hover:border-neutral-200 dark:hover:border-neutral-700 cursor-pointer"
        >
          <ArrowLeftIcon />
          <span>Home</span>
        </Button>
      </Link>
      {children}
    </main>
  );
}
