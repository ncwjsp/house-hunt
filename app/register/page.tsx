import { RegisterForm } from "@/app/ui/registerForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
