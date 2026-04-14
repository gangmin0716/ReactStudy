const handler = (request, response) => {
  if (request.method === "GET") {
    return response.status(200).json("처리완료");
  }
  if (request.method === "POST") {
    return response.status(200).json(response);
  }
};

export default handler;
