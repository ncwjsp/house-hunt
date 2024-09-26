import EditListing from "@/app/ui/editListing";

const getPropertyById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Edit({ params }) {
  const { id } = params;
  const { property } = await getPropertyById(id);
  const { name, price, location, bed, bath, car, province, images, category } =
    property;

  return (
    <EditListing
      id={id}
      name={name}
      price={price}
      location={location}
      bed={bed}
      bath={bath}
      car={car}
      province={province}
      images={images}
      category={category}
    />
  );
}
