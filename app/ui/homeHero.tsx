"use client";
import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.jpg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeHero() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black opacity-30 z-10 "></div>
      <div className="relative z-10 p-8 flex items-center justify-center flex-col h-full text-center">
        <h1 className="text-white text-5xl font-bold text-center mb-3">
          HouseHunt
        </h1>
        <p className="text-white text-lg max-w-full mx-8 mb-5">
          Start searching your dream house now!
        </p>
        <div className="flex">
          <Link
            href="/for-sale"
            className="btn bg-white text-black hover:text-white border-none  w-20"
          >
            Buy
          </Link>
          <p className="text-white text-3xl mx-3">or</p>
          <Link
            href="/for-rent"
            className="btn bg-white text-black hover:text-white border-none w-20"
          >
            Rent
          </Link>
        </div>
      </div>

      <Image src={bg} alt="background image" fill={true} objectFit="cover" />
    </div>
  );
}
