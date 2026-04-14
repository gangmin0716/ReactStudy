import { connectDB } from "@/util/database";

const handler = async (request, response) => {
  const db = (await connectDB).db("forum");
  let a = await db.collection("post").find().toArray();

  if (request.method === "GET") {
    return response.status(200).json(a);
  }
};

export default handler;
