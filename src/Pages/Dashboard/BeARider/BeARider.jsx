import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import warehouses from "../../../assets/warehouses.json";
import Rider from "../../../assets/agent-pending.png";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [coveredAreas, setCoveredAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  useEffect(() => {
    const uniqueRegions = [...new Set(warehouses.map((item) => item.region))];
    setRegions(uniqueRegions);

    if (user) {
      setValue("name", user.displayName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    const filteredByRegion = warehouses.filter((w) => w.region === selectedRegion);
    const uniqueCities = [...new Set(filteredByRegion.map((w) => w.city))];

    setCities(uniqueCities);
    setCoveredAreas([]);
    setValue("region", selectedRegion);
    setValue("city", "");
    setValue("covered_area", "");
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setValue("city", selectedCity);

    const filtered = warehouses.filter(
      (w) => w.region === selectedRegion && w.city === selectedCity
    );

    const allCoveredAreas = [...new Set(filtered.flatMap((w) => w.covered_area))];

    setCoveredAreas(allCoveredAreas);
    setValue("covered_area", "");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };
    try {
      const res = await axiosSecure.post("/riders", riderData);
      console.log(res.data.insertedId);
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your Application is pending approval.",
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-3/4 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
        {/* Form Section */}
        <div className="w-full md:w-3/4 pr-0 md:pr-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Be a Rider</h2>
          <p className="text-gray-600 mb-6">
            Join our fast-growing delivery network. Fill in the form to apply.
          </p>
          <hr className="my-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Tell us about yourself
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
              <input
                type="number"
                placeholder="Your Age"
                {...register("age", { required: true, min: 18 })}
                className="input input-bordered w-full"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">Age must be at least 18</p>
              )}
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
                onChange={handleRegionChange}
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">Region is required</p>
              )}
              <select
                {...register("city", { required: true })}
                className="select select-bordered w-full"
                onChange={handleCityChange}
                disabled={!selectedRegion}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">City is required</p>
              )}
              <input
                type="number"
                placeholder="NID No"
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">NID No is required</p>
              )}
              <input
                type="number"
                placeholder="Contact"
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">Contact is required</p>
              )}
            </div>

            <select
              {...register("covered_area", { required: true })}
              className="select select-bordered w-full"
              disabled={coveredAreas.length === 0}
            >
              <option value="">Select covered area</option>
              {coveredAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {errors.covered_area && (
              <p className="text-red-500 text-sm">Covered area is required</p>
            )}

            <button
              type="submit"
              className="btn bg-lime-500 hover:bg-lime-600 text-white w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm text-white"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/4 mt-10 md:mt-0 flex justify-center">
          <img
            src={Rider}
            alt="Rider Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
