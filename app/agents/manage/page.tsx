import Link from "next/link";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/authOptions";
import AgentRmBtn from "@/app/ui/agentRmBtn";
import { HiPencilAlt } from "react-icons/hi";

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
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const { agents } = await getAgents();
  const filteredAgents = agents.filter((agent) => agent.user === userId);

  return (
    <div>
      <div className="flex justify-center">
        <Link href="/agents/manage/add" className="btn text-white">
          Add
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 xs:grid-cols-2 gap-20">
        {filteredAgents.map((agent) => (
          <div
            key={agent._id}
            className="relative flex justify-between flex-col mt-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 mx-3"
          >
            <div className="p-4">
              <div className="flex justify-between">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  {agent.name}
                </h5>
                <div className="flex items-start">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_URL}/agents/manage/edit/${agent._id}`}
                  >
                    <HiPencilAlt size={24} color="black" />
                  </Link>
                  <AgentRmBtn id={agent._id} />
                </div>
              </div>

              <p className="text-slate-600 leading-normal font-light">
                {agent.detail}
              </p>
            </div>
            <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
              <span className="text-sm text-slate-500">
                {new Date(agent.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
