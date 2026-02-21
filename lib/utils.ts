import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function quickLinks() {
  return ["#overview", "#how-it-works", "#infrastructure", "#pricing"];
}

export function formatLinkLabel(linkLabel: string) {
  return linkLabel
    .replace(/^(#|\/)/gm, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length))
    .join(" ");
}
