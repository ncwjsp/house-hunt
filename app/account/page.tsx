import UserEditForm from "@/app/ui/userEditForm";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/authOptions";
const getUserInfo = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user info");
    }

    return res.json();
  } catch (error) {
    console.log("Error fetching user info", error);
    return null;
  }
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const { user } = await getUserInfo(userId);

  if (!user) {
    return <p>Error fetching user details</p>;
  }

  return <UserEditForm user={user} />;
}
