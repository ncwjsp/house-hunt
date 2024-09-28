import Post from "@/app/ui/post";
import Link from "next/link";

const getAgents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("error fetching agents", error);
  }
};

export default async function Page() {
  const { agents } = await getAgents();

  return (
    <div>
      <div className="flex justify-center">
        <Link href="/agents/manage" className="btn text-white">
          Manage
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 xs:grid-cols-2 gap-20">
        {agents.map((agent) => (
          <Post key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
