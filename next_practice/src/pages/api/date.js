const handler = (request, response) => {
  const now = new Date();

  response.status(200).json(now);
};

export default handler;
