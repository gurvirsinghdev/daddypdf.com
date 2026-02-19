import { Button } from "@/components/ui/button";
import Navigation from "@/modules/layout/ui/navigation";
import { BugIcon, PackageIcon, RecycleIcon, SettingsIcon } from "lucide-react";
import { title } from "process";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-48 lg:pb-16 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
                <span className="text-neutral-900 dark:text-white">
                  Design Visually.
                </span>
                <br></br>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Generate Perfectly.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-snug max-w-3xl mx-auto">
                A visual PDF builder for teams that need reliable documents
                without hard-coding layouts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button
                variant={"default"}
                className="rounded-sm cursor-pointer bg-neutral-900/90 hover:bg-neutral-800 dark:bg-white/90 dark:hover:bg-neutral-100 text-white/90 dark:text-neutral-900/90 transition-all border-transparent p-8 font-medium text-lg"
              >
                Start Designing For Free
              </Button>
              <Button
                variant={"outline"}
                className="rounded-sm cursor-pointer transition-all border-neutral-200 dark:border-neutral-800 p-8 font-medium text-lg"
              >
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-8 lg:py-16 bg-neutral-50 dark:bg-neutral-950/50 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight text-neutral-900 dark:text-white">
                PDF Generation is Broken.
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                It&apos;s 2026. Generating a simple PDF shouldn&apos;t require
                CSS hacks or outdated libraries.
              </p>
            </div>
            <div className="md:col-span-8 grid md:grid-cols-2 gap-8">
              {[
                [
                  BugIcon,
                  "Design Once, Generate Anywhere",
                  "Rendering engines breaking layouts in production? Get consistent output everywhere.",
                ],
                [
                  RecycleIcon,
                  "The design-to-dev bottleneck",
                  "Stop back-and-forth for minor design changes. Let teams update templates without deployments.",
                ],
                [
                  SettingsIcon,
                  "Fighting with legacy PDF libraries",
                  "Outdated tools slow you down. Replace brittle generators with a system built for modern workflows.",
                ],
                [
                  PackageIcon,
                  "Built for modern stacks",
                  "Use with Next.js, React, Node.js and HTTP APIs.",
                ],
              ].map(([Icon, title, breif], idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors rounded-sm"
                >
                  <Icon />
                  <h3 className="text-xl font-bold mb-2 mt-3 text-neutral-900 dark:text-white">
                    {title as string}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                    {breif as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
