"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col mt-20">
      <h2 className="text-xl">{error.message}</h2>
      <div className="flex justify-between mt-6 gap-10">
        <Button variant="secondary" onClick={reset}>
          Try again
        </Button>
        <Button onClick={() => router.push("/")}>
          Home <HomeIcon />
        </Button>
      </div>
    </div>
  );
}

export default Error;
