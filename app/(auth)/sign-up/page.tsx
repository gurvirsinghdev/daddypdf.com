"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-[400px] space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
          Create an account
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">
          Please enter your details to create an account.
        </p>
      </div>
      <div className="space-y-6">
        <Button
          variant={"default"}
          className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/90 transition-all shadow-sm text-sm font-bold cursor-pointer"
        >
          <FcGoogle />
          <span>Sign up with Google</span>
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 items-center flex">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
        </div>
        <div className="relative flex items-center justify-center text-xs uppercase tracking-widest">
          <span className="px-2 text-neutral-400 bg-background">
            Or continue with email
          </span>
        </div>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="rounded py-6"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="rounded py-6"
          />
        </div>
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-900/90 dark:hover:bg-neutral-100/90 transition-all shadow-sm text-sm cursor-pointer"
          >
            Sign up
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
        <span>Already have an account?</span>
        &nbsp;
        <Link
          href={"/sign-in"}
          className="font-bold text-neutral-900 dark:text-white hover:underline decoration-2 underline-offset-4"
        >
          Sign in to your account
        </Link>
      </p>
    </div>
  );
}
