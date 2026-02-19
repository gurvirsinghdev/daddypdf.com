import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-10 flex items-center justify-center">
                <Image
                  src="/icon.png"
                  alt="DaddyPDF Logo"
                  width={32}
                  height={40}
                  className="scale-150"
                />
              </div>
              <span className="text-xl font-bold">DaddyPDF</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs mb-6">
              The visual builder for dynamic documents. Built for teams who need
              PDFs done right.
            </p>
          </div>
          {[
            ["Quick Links", ["Home", "About", "Features", "Pricing"]],
            ["Company", ["About", "Blog", "Careers", "Contact"]],
            ["Legal", ["Terms of Service", "Privacy Policy"]],
          ].map(([title, links], idx) => (
            <div className={cn(idx === 0 && "lg:col-start-4")} key={idx}>
              <h4 className="font-bold mb-6 text-neutral-900 dark:text-white">
                {title}
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                {(links as string[]).map((linkLabel) => (
                  <li key={linkLabel}>
                    <Link
                      href={"/#" + linkLabel.toLowerCase()}
                      className="hover:text-neutral-900 dark:hover:text-white transition-all"
                    >
                      {linkLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400 font-medium">
            &copy; {new Date().getFullYear()} DaddyPDF. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 dark:bg-neutral-900 rounded-full border border-neutral-100 dark:border-neutral-800">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-neutral-500 dark:text-slate-400">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
