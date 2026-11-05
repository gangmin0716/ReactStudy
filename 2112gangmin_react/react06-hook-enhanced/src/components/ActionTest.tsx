import { useActionState, useState } from "react";

type User = {
  name: string;
};

async function getUser(prev:(User | null), formData:FormData): Promise<User | null> {
  const id = formData.get('id')
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();

  return user;
}

function ActionTest() {
  const [user, dispatchUser, isPending] = useActionState(getUser, null)
  const [id, setId] = useState("")
  return (
    <>
      <form action = {dispatchUser}>
        <input name="id" type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="submit" disabled={isPending} value="GET" />
      </form>
      <h2>{user?.name}</h2>
    </>
  )
}

export default ActionTest;