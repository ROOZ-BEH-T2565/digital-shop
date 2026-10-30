import { MonitorSmartphone } from "lucide-react";

type LoadingScreenProps = {
  text?: string;
  fullScreen?: boolean;
};

export function LoadingScreen({
  text = "loading...",
  fullScreen = true,
}: LoadingScreenProps) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
          : "flex flex-col items-center justify-center py-20"
      }
    >
      {/* لوگو با انیمیشن */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-200 opacity-75" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <MonitorSmartphone className="h-8 w-8 animate-pulse text-blue-600" />
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="mb-4 h-1 w-48 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-blue-500" />
      </div>

      {/* متن */}
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
}
