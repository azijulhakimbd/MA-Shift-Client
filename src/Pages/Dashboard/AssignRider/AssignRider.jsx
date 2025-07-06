import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [riders, setRiders] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parcelRes, riderRes] = await Promise.all([
          axiosSecure.get("/parcels"),
          axiosSecure.get("/riders/active"),
        ]);
        setParcels(parcelRes.data);
        setRiders(riderRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const handleSelectChange = (parcelId, riderId) => {
    setSelectedRiders((prev) => ({ ...prev, [parcelId]: riderId }));
  };

  const handleAssign = async (parcelId, trackingId) => {
    const riderId = selectedRiders[parcelId];
    if (!riderId) {
      return Swal.fire("Error", "Please select a rider.", "error");
    }

    try {
      const res = await axiosSecure.post("/assign-rider", {
        trackingId,
        riderId,
      });

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        Swal.fire("Success", "Rider assigned successfully!", "success");

        // Update parcel status locally
        setParcels((prev) =>
          prev.map((p) =>
            p._id === parcelId
              ? { ...p, riderId, status: "assigned", assignedAt: new Date() }
              : p
          )
        );

        setSelectedRiders((prev) => {
          const newState = { ...prev };
          delete newState[parcelId];
          return newState;
        });
      } else {
        Swal.fire("Error", "Assignment failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  const getRiderName = (riderId) => {
    const rider = riders.find((r) => r._id === riderId);
    return rider ? `${rider.name} (${rider.email})` : "N/A";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">📦 All Parcels</h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Assigned Rider</th>
                <th>Assign Rider</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td className="text-xs break-all">{parcel.trackingId}</td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.status === "pending"
                          ? "badge-warning"
                          : parcel.status === "assigned"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td>
                    {parcel.riderId ? (
                      <span className="text-green-600">{getRiderName(parcel.riderId)}</span>
                    ) : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <select
                      className="select select-sm select-bordered w-full"
                      onChange={(e) => handleSelectChange(parcel._id, e.target.value)}
                      value={selectedRiders[parcel._id] || ""}
                      disabled={parcel.status === "assigned"}
                    >
                      <option value="">-- Select Rider --</option>
                      {riders.map((rider) => (
                        <option key={rider._id} value={rider._id}>
                          {rider.name} ({rider.email})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={parcel.status === "assigned"}
                      onClick={() => handleAssign(parcel._id, parcel.trackingId)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
