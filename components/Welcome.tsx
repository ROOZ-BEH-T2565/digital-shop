import { MonitorSmartphone } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <span>welcome to</span>
      <div className="flex items-center justify-center">
        <MonitorSmartphone />
        <h1 className="text-2xl font-bold text-gray-800">Digital Shop</h1>
      </div>
      <Button>
        <Link href="/products">Go To Product</Link>
      </Button>
    </div>
  );
}

export default Welcome;
