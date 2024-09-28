import { UploadButton } from "../utils/uploadthing";
import { useState, useRef } from "react";
import Image from "next/image";
import provincesData from "@/app/provinces.json";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import user from "../models/user";

const provinces = provincesData;

type UploadedFile = {
  url: string;
  name?: string;
  size?: number;
};

export default function CreateListing() {
  const [name, setName] = useState<string>("");
  const [bed, setBed] = useState<number>(0);
  const [bath, setBath] = useState<number>(0);
  const [car, setCar] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("sale");
  const [images, setImages] = useState<string[]>([]);
  const [province, setProvince] = useState<string>("");

  const router = useRouter();

  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const handleImageUpload = (res: UploadedFile[]) => {
    if (res) {
      const uploadedImageUrls = res.map((file) => file.url);
      setImages([...images, ...uploadedImageUrls]);
    }
  };

  const handleImageDelete = (imageUrl: string) => {
    const updatedImages = images.filter((img) => img !== imageUrl);
    setImages(updatedImages);
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProvince(event.target.value);
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<unknown>>,
    value: any,
    field: string
  ) => {
    // Clear the previous timeout for the specific field
    if (typingTimeoutRef.current[field]) {
      clearTimeout(typingTimeoutRef.current[field]);
    }

    // Set a new timeout for the specific field
    typingTimeoutRef.current[field] = setTimeout(() => {
      setter(value);
    }, 300); // 300ms delay
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/property`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            bed,
            bath,
            car,
            location,
            price,
            category,
            province,
            user,
            images,
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
                    onChange={(e) =>
                      handleChange(setName, e.target.value, "name")
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
                      onChange={(e) =>
                        handleChange(setBed, Number(e.target.value), "bed")
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
                      onChange={(e) =>
                        handleChange(setBath, Number(e.target.value), "bath")
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
                      onChange={(e) =>
                        handleChange(setCar, Number(e.target.value), "car")
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
                      onChange={(e) =>
                        handleChange(setLocation, e.target.value, "location")
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
                      onChange={(e) =>
                        handleChange(setPrice, Number(e.target.value), "price")
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={province}
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
              {images.length > 0 ? (
                <div className="mt-6 mx-4 mb-5 lg:w-1/2">
                  <h2 className="text-lg font-medium text-gray-700 tracking-wide">
                    Uploaded Images
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((imageUrl, index) => (
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
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
