"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AgentForm() {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  const { data: session } = useSession();
  const user = session?.user?.id;
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            detail,
            user,
          }),
        }
      );

      if (response.ok) {
        router.push("/agents");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 rounded-md shadow-md form-container">
      <h2 className="text-2xl font-semibold mb-6">Add a new agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Agent's name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Agent name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-bold mb-2">
            Agent's detail
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Contact us at ###"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
