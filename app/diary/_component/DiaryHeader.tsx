import { useRouter } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";

const DiaryHeader = () => {
  const router = useRouter();
  return (
    <header className="flex items-center p-4 border-gray-200 shadow-xs">
      <button onClick={() => router.back()} className="mr-auto">
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold flex-1 text-center">감정기록</h1>
      <button className="ml-auto">
        <Search size={24} />
      </button>
    </header>
  );
};

export default DiaryHeader;
