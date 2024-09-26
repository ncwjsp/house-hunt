"use client";
import { UploadButton } from "../utils/uploadthing";
import { useState, useRef } from "react";
import Image from "next/image";
import provincesData from "@/app/provinces.json";
import { useRouter } from "next/navigation";

const provinces = provincesData;

type UploadedFile = {
  url: string;
  name?: string;
  size?: number;
};

export default function EditListing({
  id,
  name,
  price,
  location,
  bed,
  bath,
  car,
  province,
  images,
  category,
}) {
  const [newName, setNewName] = useState<string>(name);
  const [newBed, setNewBed] = useState<number>(bed);
  const [newBath, setNewBath] = useState<number>(bath);
  const [newCar, setNewCar] = useState<number>(car);
  const [newLocation, setNewLocation] = useState<string>(location);
  const [newPrice, setNewPrice] = useState<number>(price);
  const [newCategory, setNewCategory] = useState<string>(category);
  const [newImages, setNewImages] = useState<string[]>(images);
  const [newProvince, setNewProvince] = useState<string>(province);

  const router = useRouter();

  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const handleImageUpload = (res: UploadedFile[]) => {
    if (res) {
      const uploadedImageUrls = res.map((file) => file.url);
      setNewImages([...newImages, ...uploadedImageUrls]);
    }
  };

  const handleImageDelete = (imageUrl: string) => {
    const updatedImages = newImages.filter((img: string) => img !== imageUrl);
    setNewImages(updatedImages);
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewProvince(event.target.value);
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<unknown>>,
    value: unknown,
    field: string
  ) => {
    // Clear the previous timeout for the specific field
    if (typingTimeoutRef.current[field]) {
      clearTimeout(typingTimeoutRef.current[field]);
    }

    // Set a new timeout for the specific field
    typingTimeoutRef.current[field] = setTimeout(() => {
      setter(value);
    }, 0); // 300ms delay
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/property/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newName,
            newBed,
            newBath,
            newCar,
            newLocation,
            newPrice,
            newCategory,
            newProvince,
            newImages,
          }),
        }
      );

      if (response.ok) {
        router.push("/listings");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 pt-0.5 pb-5 text-sm">
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        <div className="w-full m-1">
          <form
            className="w-full bg-white shadow-md p-6"
            onSubmit={handleSubmit}
          >
            <div className="w-full lg:flex">
              <div className="flex flex-wrap -mx-3 mb-6 lg:w-1/2">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Property Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    name="name"
                    placeholder="Property Name"
                    required
                    value={newName}
                    onChange={(e) =>
                      handleChange(setNewName, e.target.value, "name")
                    }
                  />
                </div>

                <div className="flex w-full">
                  <div className="px-3 mb-6 w-1/3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="bedroom"
                    >
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedroom"
                      id="bedroom"
                      className="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      placeholder="Number"
                      value={newBed}
                      onChange={(e) =>
                        handleChange(setNewBed, Number(e.target.value), "bed")
                      }
                    />
                  </div>
                  <div className="px-3 mb-6 w-1/3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="bathroom"
                    >
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathroom"
                      id="bathroom"
                      className="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      placeholder="Number"
                      value={newBath}
                      onChange={(e) =>
                        handleChange(setNewBath, Number(e.target.value), "bath")
                      }
                    />
                  </div>
                  <div className="px-3 mb-6 w-1/3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="car"
                    >
                      CAR PARKS
                    </label>
                    <input
                      type="number"
                      name="car"
                      id="car"
                      className="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      placeholder="Number"
                      value={newCar}
                      onChange={(e) =>
                        handleChange(setNewCar, Number(e.target.value), "car")
                      }
                    />
                  </div>
                </div>

                <div className="w-full md:w-full">
                  <div className="px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="location"
                    >
                      LOCATION
                    </label>
                    <input
                      type="string"
                      name="location"
                      id="location"
                      className="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      placeholder="Additional Location Information"
                      value={newLocation}
                      onChange={(e) =>
                        handleChange(setNewLocation, e.target.value, "location")
                      }
                    />
                  </div>
                  <div className="px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      PRICE
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="appearance-none block w-full bg-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                      placeholder="How much do you want to sell or rent out"
                      value={newPrice}
                      onChange={(e) =>
                        handleChange(
                          setNewPrice,
                          Number(e.target.value),
                          "price"
                        )
                      }
                    />
                  </div>
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    name="category"
                    required
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <select
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    name="province"
                    value={newProvince}
                    onChange={handleProvinceChange}
                    required
                  >
                    <option value="">Select a province</option>
                    {provinces.map((province: string, index: number) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full flex justify-center">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      handleImageUpload(res);
                      console.log("Files: ", res);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
              {newImages.length > 0 ? (
                <div className="mt-6 mx-4 mb-5 lg:w-1/2">
                  <h2 className="text-lg font-medium text-gray-700 tracking-wide">
                    Uploaded Images
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {newImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative w-full h-[150px] overflow-hidden rounded-lg shadow-md"
                      >
                        <Image
                          src={imageUrl}
                          alt={`Uploaded ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                          onClick={() => handleImageDelete(imageUrl)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-1/2 flex justify-center my-4">
                  <div className="text-xl">Upload an image to preview</div>
                </div>
              )}
            </div>
            <div className="px-3 mb-6 flex justify-center">
              <button
                type="submit"
                className="appearance-none block bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-10 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Edit Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
