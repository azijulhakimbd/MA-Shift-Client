import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner";
import { AiOutlineEye, AiOutlineStop } from "react-icons/ai";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch approved (active) riders
  const { data: activeRiders = [], isLoading, isError } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Mutation to deactivate a rider
  const deactivateMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/riders/deactivate/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeRiders"] });
      Swal.fire("Deactivated!", "Rider has been marked as inactive.", "success");
      setSelectedRider(null);
    },
  });

  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Deactivate Rider?",
      text: "This will mark the rider as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Deactivate",
    }).then((res) => {
      if (res.isConfirmed) {
        deactivateMutation.mutate(id);
      }
    });
  };

  const filteredRiders = activeRiders.filter((rider) => {
    const text = searchText.toLowerCase();
    return (
      rider.name?.toLowerCase().includes(text) ||
      rider.email?.toLowerCase().includes(text) ||
      rider.city?.toLowerCase().includes(text) ||
      rider.region?.toLowerCase().includes(text)
    );
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return <div className="text-red-600">Failed to load active riders.</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, email, city, or region"
        className="input input-bordered w-full max-w-md mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Riders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.contact || "N/A"}</td>
                  <td>{rider.region}</td>
                  <td>{rider.city}</td>
                  <td>{rider.status}</td>
                  <td className="flex gap-1 flex-wrap">
                    <button
                      title="View Details"
                      className="btn btn-sm btn-info flex items-center gap-1"
                      onClick={() => setSelectedRider(rider)}
                    >
                      <AiOutlineEye /> View
                    </button>
                    <button
                      title="Deactivate Rider"
                      className="btn btn-sm btn-warning flex items-center gap-1"
                      onClick={() => handleDeactivate(rider._id)}
                      disabled={deactivateMutation.isLoading}
                    >
                      <AiOutlineStop /> Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No matching riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rider Info Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl w-[90%] md:w-1/2 relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-black"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              Rider Information
            </h3>
            <div className="space-y-2 text-gray-700 text-base">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Age:</strong> {selectedRider.age || "N/A"}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.contact || "N/A"}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>City:</strong> {selectedRider.city}</p>
              <p><strong>Covered Area:</strong> {selectedRider.covered_area}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Status:</strong> {selectedRider.status}</p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(selectedRider.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
