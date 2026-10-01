import { useSearchParams } from "react-router";
import type { ChangeEvent } from "react";

const FaqPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  console.log(searchParams);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ keyword: e.target.value });
  };

  return (
    <div>
      <h2>자주 묻는 질문</h2>
      <input value={keyword} onChange={onChange} />
    </div>
  );
};
export default FaqPage;
