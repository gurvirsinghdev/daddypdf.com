"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import createSupabaseClient from "@/lib/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string("Please enter a password.")
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password cannot be longer than 32 characters."),
});

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const nextPathParam = searchParams.get("next");
  const nextPath =
    nextPathParam && nextPathParam.startsWith("/") && !nextPathParam.startsWith("//")
      ? nextPathParam
      : "/dashboard";

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const supabaseClient = createSupabaseClient();
    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.user) {
      form.reset();
      toast.success("Account created successfully!", {
        description: "Please check your email for a verification link before signing in.",
      });
    }
  };

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
          type="button"
          disabled
          aria-disabled="true"
          variant={"default"}
          className="relative w-full flex items-center justify-center gap-3 px-4 py-6 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-white rounded border border-neutral-200 dark:border-neutral-700 shadow-sm text-sm font-bold opacity-60 cursor-not-allowed overflow-visible"
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-background px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 pointer-events-none">
            Coming soon
          </span>
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
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="name@company.com"
                    className="rounded py-6"
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
                <FormLabel
                  htmlFor={field.name}
                  className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="********"
                    className="rounded py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-900/90 dark:hover:bg-neutral-100/90 transition-all shadow-sm text-sm cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2Icon className="size-4 animate-spin" />
                </div>
              ) : (
                <span>Sign up</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
        <span>Already have an account?</span>
        &nbsp;
        <Link
          href={nextPath === "/dashboard" ? "/sign-in" : `/sign-in?next=${encodeURIComponent(nextPath)}`}
          className="font-bold text-neutral-900 dark:text-white hover:underline decoration-2 underline-offset-4"
        >
          Sign in to your account
        </Link>
      </p>
    </div>
  );
}
