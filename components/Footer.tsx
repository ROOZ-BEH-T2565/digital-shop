// components/Footer.tsx
import Link from "next/link";
import { MonitorSmartphone } from "lucide-react";

// این تابع یک بار اجرا و نتیجه کش می‌شود
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="mt-auto w-full border-t bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        {/* لوگو و نام */}
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <MonitorSmartphone className="h-5 w-5" />
          <span>Digital Shop</span>
        </div>

        {/* لینک‌ها */}
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="transition-colors hover:text-gray-900">
            خانه
          </Link>
          <Link
            href="/products"
            className="transition-colors hover:text-gray-900"
          >
            محصولات
          </Link>
          <Link href="/about" className="transition-colors hover:text-gray-900">
            درباره ما
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-gray-900"
          >
            تماس
          </Link>
        </nav>

        {/* کپی‌رایت */}
        <p className="text-xs text-gray-500">© {year} Digital Shop</p>
      </div>
    </footer>
  );
}

export default Footer;
