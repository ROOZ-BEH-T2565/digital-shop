import { MonitorSmartphone, ShoppingCart } from "lucide-react";
import Link from "next/link";

function Haeder() {
  return (
    <header className="sticky top-0 z-50 flex justify-between p-4 shadow w-full bg-white">
      <div className="flex items-center justify-center">
        <MonitorSmartphone />
        <Link href="/" className="font-bold text-2xl">
          Digital Shop
        </Link>
      </div>
      <ShoppingCart />
    </header>
  );
}

export default Haeder;
