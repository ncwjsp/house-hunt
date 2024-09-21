import Image from "next/image";
import bg from "@/public/bg.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black opacity-30 z-10 "></div>
      <div className="relative z-10 p-8 flex items-center justify-center flex-col h-full text-center">
        <h1 className="text-white text-5xl font-bold text-center mb-3">
          HouseHunt
        </h1>
        <p className="text-white text-lg max-w-full mx-8 mb-5">
          HouseHunt is a real estate app where users can search for properties,
          connect with agents, and manage their favorite listings. It lets users
          sign up, browse property details, view agent profiles, save properties
          they like, and message agents directly. The app is easy to use on any
          device and includes features like advanced search filters and
          interactive maps.
        </p>
        <Link
          href="/login"
          className="btn bg-white text-black hover:text-white border-none "
        >
          Get Started
        </Link>
      </div>

      <Image src={bg} alt="background image" fill={true} objectFit="cover" />
    </div>
  );
}
