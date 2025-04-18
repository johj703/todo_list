"use client";

import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  return (
    <form onSubmit={} className="">
      <div className="">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요."
          className=""
        />
        <button type="submit" className="">
          추가
        </button>
      </div>
    </form>
  );
}
