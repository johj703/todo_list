"use client";

interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}
export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="">
      <button onClick={() => setFilter("all")} className={}>
        전체
      </button>
      <button onClick={() => setFilter("active")} className={}>
        활성
      </button>
      <button onClick={() => setFilter("completed")} className={}>
        완료
      </button>
    </div>
  );
}
