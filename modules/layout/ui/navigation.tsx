import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl max-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
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
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {["Overview", "How it works", "Infrastructure", "Pricing"].map(
              (linkLabel) => (
                <Link
                  key={linkLabel}
                  href={"#" + linkLabel.toLowerCase().replaceAll(" ", "-")}
                  className="text-neutral-900/90 hover:text-black capitalize dark:text-white/90 dark:hover:text-white transition-all"
                >
                  {linkLabel}
                </Link>
              ),
            )}
          </div>
          <div>
            <Button
              className="rounded-sm cursor-pointer bg-neutral-900/90 hover:bg-neutral-800 dark:bg-white/90 dark:hover:bg-neutral-100 text-white/90 dark:text-neutral-900/90 transition-all border-transparent p-6 text-sm font-medium"
              variant={"default"}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
