import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner";

// React Icons
import { AiOutlineEye, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders
  const { data: pendingRiders = [], isLoading, isError } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/riders/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRiders"] });
      Swal.fire("Approved!", "", "success");
      setSelectedRider(null);
    },
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/riders/cancel/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRiders"] });
      Swal.fire("Cancelled!", "", "success");
      setSelectedRider(null);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Application?",
      text: "This will remove the rider application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-600">Error loading pending riders.</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.contact || "N/A"}</td>
                <td>{rider.region}</td>
                <td>{rider.city}</td>
                <td className="flex gap-1">
                  <button
                    title="View"
                    className="btn btn-sm btn-info flex items-center gap-1"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <AiOutlineEye size={18} />
                  </button>
                  <button
                    title="Approve"
                    className="btn btn-sm btn-success flex items-center gap-1"
                    onClick={() => handleApprove(rider._id)}
                    disabled={approveMutation.isLoading}
                  >
                    <AiOutlineCheck size={18} />
                  </button>
                  <button
                    title="Reject"
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleReject(rider._id)}
                    disabled={cancelMutation.isLoading}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>City:</strong> {selectedRider.city}
              </p>
              <p>
                <strong>Covered Area:</strong> {selectedRider.covered_area}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRider.contact || "N/A"}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(selectedRider.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn btn-success flex items-center gap-1"
                onClick={() => handleApprove(selectedRider._id)}
                disabled={approveMutation.isLoading}
              >
                <AiOutlineCheck size={20} />
                Approve
              </button>
              <button
                className="btn btn-error flex items-center gap-1"
                onClick={() => handleReject(selectedRider._id)}
                disabled={cancelMutation.isLoading}
              >
                <AiOutlineClose size={20} />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
