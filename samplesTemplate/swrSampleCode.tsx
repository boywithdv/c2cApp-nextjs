import useSWR from "swr"

type User = {
    name:string
}
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
const Profile = () =>{
    ///api/userへリクエストを送り、帰ってきた値をfetcherで処理を行う
    const {data,error} = useSWR<User>("/api/user",fetcher)
    if(error) return <div>failed to load</div>
    if(!data) return <div>loading...</div>
    return <div>Hello {data.name}!</div>
}