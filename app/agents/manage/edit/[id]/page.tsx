import EditAgent from "@/app/ui/editAgent";

const getAgentById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/agent/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch agent");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Edit({ params }) {
  const { id } = params;
  const { agent } = await getAgentById(id);
  const { name, detail } = agent;

  return <EditAgent id={id} name={name} detail={detail} />;
}
