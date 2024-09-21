"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return <div>HELLO{session?.user?.name}</div>;
}
