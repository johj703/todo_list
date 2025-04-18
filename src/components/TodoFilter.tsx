"use client";

interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}
export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        전체
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "active"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        활성
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded transition-colors ${
          filter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        완료
      </button>
    </div>
  );
}
