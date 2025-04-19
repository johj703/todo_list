"use client";

// 요구사항 2: 완료 상태를 별도로 확인할 수 있는 필터/탭 기능
// 요구사항 4: TypeScript를 통한 인터페이스/타입 정의
interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}
export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        } flex-1 sm:flex-none`}
      >
        전체
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "active"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        } flex-1 sm:flex-none`}
      >
        활성
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        } flex-1 sm:flex-none`}
      >
        완료
      </button>
    </div>
  );
}
