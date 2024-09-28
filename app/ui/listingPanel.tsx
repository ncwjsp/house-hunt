import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RemoveBtn from "@/app/ui/removeBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getProperties = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/property`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("error fetching property", error);
  }
};

export default async function ListingPanel() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const { properties } = await getProperties();
  const userProperties = properties.filter(
    (property) => property.user === userId
  );

  return (
    <div className="overflow-x-auto my-4 mx-6">
      <table className="table">
        <thead className="text-gray-600">
          <tr>
            <th>Property</th>
            <th>Category</th>
            <th>Location</th>
            <th>Price</th>
            <th>Configuration</th>
          </tr>
        </thead>
        <tbody>
          {userProperties.map((property) => (
            <tr key={property.id}>
              <td>
                <div>
                  <div className="font-bold">{property.name}</div>
                  <div className="text-sm opacity-50">{property.location}</div>
                </div>
              </td>
              <td>{property.category}</td>
              <td>
                {property.province}, {property.location}
              </td>
              <td>{property.price.toLocaleString()}</td>
              <td className="flex gap-2">
                <Link href={`/listings/edit/${property._id}`}>
                  <HiPencilAlt size={24} color="black" />
                </Link>
                <RemoveBtn id={property._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-2">
        <Link href={"/listings/add"} className="btn btn-neutral text-white">
          Add Property
        </Link>
      </div>
    </div>
  );
}
