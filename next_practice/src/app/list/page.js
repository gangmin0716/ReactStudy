import { connectDB } from "@/util/database";
import Link from "next/link";

const List = async () => {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, index) => {
        return (
          <Link key={index} href={`/detail/${result[index]._id.toString()}`}>
            <div key={index} className="list-item">
              <h4>{result[index].title}</h4>
              <p>{result[index].content}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default List;
