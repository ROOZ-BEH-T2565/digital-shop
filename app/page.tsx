import { Banner } from "@/components/banner";
import Welcome from "@/components/Welcome";
// import { Button } from "@/components/ui/button";
// import { MousePointerClick } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Banner />
      <Welcome />
    </div>
  );
}
