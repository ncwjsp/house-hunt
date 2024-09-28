import Hero from "@/app/ui/hero";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");

  return (
    <div>
      <Hero />
    </div>
  );
}
