import { useEffect, useState } from 'react'
type User = {
  num: number;
  id: string;
  name: string;
  cell: string;
};
type UserDetail = {
  num: number;
  id: string;
  name: string;
  cell: string;
  description: string;
};
type GlobalTopProps = {
  myLinkClick: (num: string) => void;
};
type ContentBodyProps = {
  myResult: UserDetail | null;
};
const GlobalTop = ({ myLinkClick }: GlobalTopProps) => {
  console.log('1.컴포넌트실행');
  const [myList, setMyList] = useState<User[]>([]);
  useEffect(() => {
    console.log('3.useEffect실행');
    fetch('/json/myData.json')
      .then((result) => {
        return result.json();
      })
      .then((json: User[]) => {
        console.log(json);
        setMyList(json);
      });
  }, []);
  const listTag = myList.map((data) => {
    return (
      <li key={data.id}>
        <a href={data.id} data-id={data.num}
           onClick={(e) => {
             e.preventDefault();
             myLinkClick(e.currentTarget.dataset.id!);
           }} >
          {data.id}
        </a>
      </li> ); });
  console.log('2.return실행(rendering)');
  return (
    <nav>
      <ul>{listTag}</ul>
    </nav>
  );
};
const ContentBody = ({ myResult }:
                     ContentBodyProps) => {
  if (!myResult) {
    return <div>사용자를 선택하세요.</div>;
  }
  return (
    <div>
      <h2>{myResult.name}</h2>
      <ul>
        <li>num : {myResult.num}</li>
        <li>id : {myResult.id}</li>
        <li>cell : {myResult.cell}</li>
        <li>description :
          {myResult.description}</li>

      </ul>
    </div>
  );
};
function LocalJsonFetcher() {
  const [myResult, setMyResult] = useState<UserDetail |
    null>(null);
  return (
    <>
      <h2>내부 서버 통신</h2>
      <GlobalTop
        myLinkClick={(num) => {
          console.log('클릭', num);
          fetch(`/json/dto${num}.json`)
            .then((result) => {
              return result.json();
            })
            .then((json: UserDetail) => {
              setMyResult(json);
            });
        }}
      />
      <ContentBody myResult={myResult} />
    </>
  );
}
export default LocalJsonFetcher;