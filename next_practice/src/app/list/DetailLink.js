"use client";

import { useRouter } from "next/navigation";

const DetailLink = () => {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/detail");
      }}
    >
      버튼
    </button>
  );
};

export default DetailLink;
