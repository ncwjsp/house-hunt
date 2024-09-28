import Card from "@/app/ui/card";

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

export default async function Page() {
  const { properties } = await getProperties();
  const saleProperties = properties.filter(
    (property) => property.category === "rent"
  );

  return (
    <div className="grid lg:grid-cols-5 xs:grid-cols-2">
      {saleProperties.map((property) => (
        <Card key={property.id} property={property} />
      ))}
    </div>
  );
}
