const Write = () => {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/date" method="GET">
        <input name="title" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
};

export default Write;
