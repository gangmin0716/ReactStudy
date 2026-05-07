const handler = (request, response) => {
  if (request.method === "POST") {
    return response.json(response.body);
  }
};

export default handler;
