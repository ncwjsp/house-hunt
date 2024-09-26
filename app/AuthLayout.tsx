import { getServerSession } from "next-auth";
import Navbar from "@/app/ui/navbar";
import { ReactNode } from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && <Navbar />}
      <main style={{ minHeight: "100vh" }}>{children}</main>
    </>
  );
}
