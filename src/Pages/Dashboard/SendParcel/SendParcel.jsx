import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import warehouses from "../../../assets/warehouses.json"
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const [cost, setCost] = useState(null);
  const [regionList, setRegionList] = useState([]);
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      type: "document",
      senderName: "",
    },
  });

  // Update sender name when user is available
  useEffect(() => {
    if (user?.displayName) {
      setValue("senderName", user.displayName);
    }
  }, [user, setValue]);

  const watchType = watch("type");
  const watchSenderRegion = watch("senderRegion");
  const watchReceiverRegion = watch("receiverRegion");

  useEffect(() => {
    const uniqueRegions = [...new Set(warehouses.map((w) => w.region))];
    setRegionList(uniqueRegions);
  }, []);

  useEffect(() => {
    const selected = warehouses.find((w) => w.region === watchSenderRegion);
    setSenderCenters(selected ? selected.covered_area : []);
  }, [watchSenderRegion]);

  useEffect(() => {
    const selected = warehouses.find((w) => w.region === watchReceiverRegion);
    setReceiverCenters(selected ? selected.covered_area : []);
  }, [watchReceiverRegion]);

  const calculateCost = (data) => {
    const isDocument = data.type === "document";
    const weight = parseFloat(data.weight) || 0;
    const sameRegion = data.senderRegion === data.receiverRegion;

    if (isDocument) {
      return sameRegion ? 60 : 80;
    }

    if (weight <= 3) {
      return sameRegion ? 110 : 150;
    } else {
      const extraWeightCost = (weight - 3) * 40;
      const base = sameRegion ? 110 : 150;
      const outsideExtra = sameRegion ? 0 : 40;
      return base + extraWeightCost + outsideExtra;
    }
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);

    const isDocument = data.type === "document";
    const weight = parseFloat(data.weight) || 0;
    const sameRegion = data.senderRegion === data.receiverRegion;

    let breakdown = "";
    if (isDocument) {
      breakdown = sameRegion
        ? "Document (within district): ৳60"
        : "Document (outside district): ৳80";
    } else if (weight <= 3) {
      breakdown = sameRegion
        ? "Non-Document (≤3kg, within district): ৳110"
        : "Non-Document (≤3kg, outside district): ৳150";
    } else {
      const extraWeight = weight - 3;
      const base = sameRegion ? 110 : 150;
      const extraCost = extraWeight * 40;
      const outsideExtra = sameRegion ? 0 : 40;
      breakdown = `
      Non-Document (>3kg)<br/>
      Base: ৳${base}<br/>
      Extra Weight (${extraWeight}kg × ৳40): ৳${extraCost}<br/>
      ${outsideExtra ? `Outside District Extra: ৳${outsideExtra}<br/>` : ""}
    `;
    }

    Swal.fire({
      title: "📦 Parcel Cost Summary",
      html: `
    <p><strong>Parcel Type:</strong> ${
      data.type === "document" ? "Document" : "Non-Document"
    }</p>
    ${!isDocument ? `<p><strong>Weight:</strong> ${weight} kg</p>` : ""}
    <p><strong>From:</strong> ${data.senderRegion}</p>
    <p><strong>To:</strong> ${data.receiverRegion}</p>
    <hr/>
    <p><strong>Total Cost:</strong> ৳${deliveryCost}</p>
    <p>${breakdown}</p>
  `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue to Payment",
      cancelButtonText: "Continue Editing",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#FBBF24",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(data);
      }
    });
  };
  const handleConfirm = (data) => {
    const trackingId = `TRK-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    const parcelData = {
      ...data,
      cost,
      trackingId,
      delivery_status: "not_collected",
      status: "Pending",
      creation_date: new Date().toISOString(),
    };

    console.log("Saved Parcel:", parcelData);
    // send data backend
    axiosSecure.post("/parcels", parcelData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        // TODO: Redirect to payment page
        Swal.fire({
          title: "Redirecting...",
          text: "Proceeding to payment gateway.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
    toast.success(`Parcel saved! Tracking ID: ${trackingId}`);
    reset();
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Send a Parcel</h2>
        <p className="text-gray-500">Door to Door Delivery Booking</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="form-control">
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("type")}
                    type="radio"
                    value="document"
                    className="radio"
                    defaultChecked
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("type")}
                    type="radio"
                    value="non-document"
                    className="radio"
                  />
                  <span>Non-Document</span>
                </label>
              </div>
            </div>

            <div className="form-control">
              <input
                {...register("title", { required: "Title is required" })}
                className="input input-bordered w-full"
                placeholder="Parcel Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {watchType === "non-document" && (
              <div className="form-control">
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  className="input input-bordered w-full"
                  placeholder="Weight (kg)"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender and Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                {...register("senderName")}
                className="input input-bordered w-full"
                readOnly
                placeholder="Sender Name"
              />

              <input
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />

              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regionList.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {senderCenters.map((center, idx) => (
                  <option key={idx} value={center}>
                    {center}
                  </option>
                ))}
              </select>

              <input
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Address"
              />

              <textarea
                {...register("pickupInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />

              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact"
              />

              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regionList.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {receiverCenters.map((center, idx) => (
                  <option key={idx} value={center}>
                    {center}
                  </option>
                ))}
              </select>

              <input
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
                placeholder="Address"
              />

              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
