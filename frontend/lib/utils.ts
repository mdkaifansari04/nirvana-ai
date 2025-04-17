import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import type { Config } from "dompurify";
import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";

const isBrowser = typeof window !== "undefined";

let DOMPurify: { sanitize: (html: string, options?: Config) => string } | null = null;

if (isBrowser) {
  import("dompurify").then((module) => {
    DOMPurify = module.default;
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely sanitize HTML content
 */
export function sanitizeHtml(html: string, options?: Config): string {
  if (isBrowser && DOMPurify) {
    return DOMPurify.sanitize(html, options);
  }
  return html;
}

/**
 * Renders HTML content safely with sanitization
 * @deprecated Use parseHTML instead to avoid dangerouslySetInnerHTML
 */
export function renderHTML(html: string) {
  return { __html: sanitizeHtml(html) };
}

/**
 * Parses HTML string to React elements after sanitizing
 */
export function parseHTML(html: string) {
  const sanitized = sanitizeHtml(html);
  return parse(sanitized);
}

/**
 * Strips HTML tags from a string
 */
export function stripHtml(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export const getErrorMessage = (error: Error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  return axiosError.response?.data?.message || "Something went wrong, Please try again";
};
