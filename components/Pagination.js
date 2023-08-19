"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { paginate } from "@/redux/features/paginationSlice";

export default function Pagination({ page, totalPages, setPage }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center space-x-6 ">
      <button
        onClick={() => dispatch(paginate(-1))}
        disabled={page <= 1}
        className="px-4 py-2 disabled:opacity-30 bg-gray-300 rounded-md"
      >
        Prev
      </button>
      <span>{page}</span>
      <button
        onClick={() => dispatch(paginate(1))}
        disabled={page >= totalPages}
        className="px-4 py-2 disabled:opacity-30 bg-gray-300 rounded-md"
      >
        Next
      </button>
    </div>
  );
}
