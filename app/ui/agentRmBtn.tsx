"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function AgentRmBtn({ id }) {
  const router = useRouter();

  const removeAgent = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agent?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeAgent} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
