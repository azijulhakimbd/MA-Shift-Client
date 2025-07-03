import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import warehouses from "../../../assets/warehouses.json";
import Rider from "../../../assets/agent-pending.png";

const BeARider = () => {
  const { user } = useAuth();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]); // ✅ FIXED
  const [coveredAreas, setCoveredAreas] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const filteredByRegion = warehouses.filter(
      (w) => w.region === selectedRegion
    );
    const uniqueCities = [...new Set(filteredByRegion.map((w) => w.city))];

    setCities(uniqueCities);
    setWarehouseOptions([]);
    setCoveredAreas([]);
    setValue("region", selectedRegion);
    setValue("city", "");
    setValue("warehouse", "");
    setValue("covered_area", "");
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setValue("city", selectedCity);

    const filtered = warehouses.filter(
      (w) => w.region === selectedRegion && w.city === selectedCity
    );

    const warehouseNames = filtered.map((w) => w.warehouse);
    const allCoveredAreas = [
      ...new Set(filtered.flatMap((w) => w.covered_area)),
    ];

    setWarehouseOptions(warehouseNames);
    setCoveredAreas(allCoveredAreas);
    setValue("warehouse", "");
    setValue("covered_area", "");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`/riders`, data);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider application has been received.",
          timer: 3000,
          showConfirmButton: false,
        });
        reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
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
                className="input input-bordered w-full"
                readOnly
              />
              <input
                type="number"
                placeholder="Your Age"
                {...register("age", { required: true, min: 18 })}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
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
              <select
                {...register("city", { required: true })}
                className="select select-bordered w-full"
                onChange={handleCityChange}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="NID No"
                {...register("nid", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Contact"
                {...register("contact", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <select
              {...register("warehouse", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select district</option>
              {warehouseOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              {...register("covered_area", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select covered area</option>
              {coveredAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

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
