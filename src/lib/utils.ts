import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function localDate(date: string) {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const d = new Date(date);

  return d.toLocaleDateString('en-US', options);
}