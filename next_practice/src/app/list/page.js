import { connectDB } from "@/util/database";

const List = async () => {

  const db = (await connectDB).db("forum");
  let a = await db.collection("post").find().toArray();
  console.log(a);

  return (
    <div className="list-bg">
      {
        a.map((item, index) => {
          return (
            <div key={index} className="list-item">
              <h4>{a[index].title}</h4>
              <p>{a[index].content}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default List;
