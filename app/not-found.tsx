import { buttonVariants } from "@/components/ui/button";
import { Home, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
      </div>

      <div className="flex max-w-lg flex-col items-center text-center">
        {/* 404 */}
        <div className="relative mb-6">
          <span className="select-none text-[120px] font-black leading-none text-black sm:text-[160px]">
            404
          </span>
          <span className="absolute inset-0 -z-10 animate-pulse text-[120px] font-black leading-none text-black/5 sm:text-[160px]">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50/50">
          <Search className="h-8 w-8 text-blue-600" />
        </div>

        {/* Text */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-sm text-gray-500 sm:text-base">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
