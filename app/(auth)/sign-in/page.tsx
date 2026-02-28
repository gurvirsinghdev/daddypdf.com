"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createSupabaseClient from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string("Please enter a password.")
    .min(1, "Please enter a password."),
});

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const supabaseClient = createSupabaseClient();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        toast.error("Please verify your email before signing in.");
      } else {
        toast.error(error.message);
      }
      return;
    }

    if (data.user) {
      form.reset();
      toast.success("Signed in successfully!", {
        description: "Redirecting...",
      });
      router.push("/api/auth/complete");
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-[400px] space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">
          Please enter your details to sign in to your account.
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
          <span>Sign in with Google</span>
        </Button>
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
                  <span>Sign in</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
        <span>Don&apos;t have an account?</span>
        &nbsp;
        <Link
          href="/sign-up"
          className="font-medium text-neutral-900 dark:text-white hover:underline decoration-2 underline-offset-4"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
