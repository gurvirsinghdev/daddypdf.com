import { Button } from "@/components/ui/button";
import Footer from "@/modules/layout/ui/footer";
import Navigation from "@/modules/layout/ui/navigation";
import {
  BadgeCheckIcon,
  BoltIcon,
  BugIcon,
  CloudLightningIcon,
  Icon,
  LockKeyholeIcon,
  PackageIcon,
  RecycleIcon,
  SettingsIcon,
} from "lucide-react";
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
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
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

      {/* Overview Section */}
      <section
        id="overview"
        className="py-8 lg:py-16 bg-neutral-50 dark:bg-neutral-950/50 border-y border-neutral-100 dark:border-neutral-800"
      >
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
                  "Works with your stack",
                  "If it can send an HTTP request, it works.",
                ],
              ].map(([Icon, title, breif], idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors rounded-sm"
                >
                  <Icon />
                  <h3 className="text-xl font-bold mb-2 mt-3 text-neutral-900 dark:text-white">
                    {title as string}.
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

      {/* How it works Section */}
      <section id="how-it-works" className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-neutral-900 dark:text-white">
              How it works
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              A seemless bridge between visual design and dynamic content.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {[
              [
                "Design visually",
                "Design templates on a high-fidelity canvas. Set styles once and reuse everywhere.",
              ],
              [
                "Connect your data",
                "Map data to templates using simple JSON. No complex logic required.",
              ],
              [
                "Generate via API",
                "Send a request. Get a PDF. Built to scale with your workload.",
              ],
            ].map(([title, breif], idx) => (
              <div key={idx} className="group">
                <div className="border-t-2 border-neutral-200 dark:border-neutral-800 pt-8 mb-6 group-hover:border-neutral-900 dark:group-hover:border-white transition-colors duration-500">
                  <span className="font-mono text-sm text-neutral-400 dark:text-neutral-500 mb-2 block">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                    {title}
                  </h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pr-8">
                  {breif}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section
        id="infrastructure"
        className="py-8 lg:py-16 bg-neutral-50 dark:bg-neutral-950/50 border-y border-neutral-100 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-8 text-neutral-900 dark:text-white">
                Production-ready reliability.
              </h2>
              <div className="space-y-8">
                {[
                  [
                    BadgeCheckIcon,
                    "99.99% Uptime SLA",
                    "Your documents generate when you need them. No downtime surprises.",
                  ],
                  [
                    LockKeyholeIcon,
                    "SOC2 Compliant",
                    "Security built in from day one. Encryption at rest and in transit.",
                  ],
                  [
                    CloudLightningIcon,
                    "Sub-second generation",
                    "Fast rendering designed for high-volume workloads.",
                  ],
                ].map(([Icon, title, breif], idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <Icon className="mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {title as string}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        {breif as string}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}
