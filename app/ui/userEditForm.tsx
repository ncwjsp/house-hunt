"use client";
import { useState } from "react";

export default function UserEditForm({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: name,
          newEmail: email,
        }),
      });

      if (response.ok) {
        setMessage("User details updated successfully.");
      } else {
        setMessage("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-100"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-gray-100"
                required
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white my-5"
            >
              Save Changes
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
}
