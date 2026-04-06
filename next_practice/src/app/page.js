import { connectDB } from "@/util/database";

const Home = async () => {

  const db = (await connectDB).db("forum");
  let a =await db.collection("post").find().toArray();
  console.log(a);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
