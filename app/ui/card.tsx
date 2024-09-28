import { IoCarSportOutline } from "react-icons/io5";
import { LuBath, LuBed } from "react-icons/lu";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Link from "next/link";

export default function Card({ property }: any) {
  if (!property) {
    return <div>No properties found</div>;
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-center">
        <div className="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <div
                className="bg-cover bg-center h-56 p-4"
                style={{
                  backgroundImage: `url(${property.images[0]})`,
                }}
              ></div>
            ) : (
              <div
                className="bg-cover bg-center h-56 p-4 flex justify-center"
                style={{
                  backgroundImage: `url(https://via.placeholder.com/450x450)`,
                }}
              >
                <p
                  className="my-auto text-3xl text-center"
                  style={{
                    backgroundImage: `url(https://via.placeholder.com/450x450)`,
                  }}
                >
                  This property has no images
                </p>
              </div>
            )}
            <div className="p-4">
              <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                {property.name}
              </p>
              <p className="text-3xl text-gray-900">
                ฿{property.price.toLocaleString()}
              </p>
              <p className="text-gray-700">{property.location}</p>
              <p className="text-black">{property.province}</p>
            </div>
            <div className="flex p-4 border-t border-gray-300 text-gray-700">
              <div className="flex-1 inline-flex items-center">
                <div className="h-6 w-6 text-gray-600 fill-current mr-3">
                  <LuBed size={28} />
                </div>
                <p>
                  <span className="text-gray-900 font-bold">
                    {property.bed}
                  </span>
                </p>
              </div>
              <div className="flex-1 inline-flex items-center">
                <div className="h-6 w-6 text-gray-600 fill-current mr-3">
                  <LuBath size={26} />
                </div>
                <p>
                  <span className="text-gray-900 font-bold">
                    {property.bath}
                  </span>
                </p>
              </div>
              <div className="flex-1 inline-flex items-center">
                <div className="h-6 w-6 text-gray-600 fill-current mr-3">
                  <IoCarSportOutline size={30} />
                </div>

                <p>
                  <span className="text-gray-900 font-bold">
                    {property.car}
                  </span>
                </p>
              </div>
            </div>
            <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                Posted Date
              </div>
              <div className="flex items-center pt-2 justify-between">
                <p className="font-bold text-gray-900 text-m">
                  {new Date(property.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <Link
                  href={`${process.env.NEXTAUTH_URL}/messages/${property.user}`}
                >
                  <IoChatbubbleEllipses size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
