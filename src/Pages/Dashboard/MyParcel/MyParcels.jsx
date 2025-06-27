import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    Swal.fire({
      title: parcel.title,
      html: `
        <p><strong>Tracking ID:</strong> ${parcel.trackingId}</p>
        <p><strong>Type:</strong> ${parcel.type}</p>
        <p><strong>Sender:</strong> ${parcel.senderName} (${parcel.senderContact})</p>
        <p><strong>Receiver:</strong> ${parcel.receiverName} (${parcel.receiverContact})</p>
        <p><strong>Cost:</strong> ৳${parcel.cost ?? "N/A"}</p>
        <p><strong>Status:</strong> ${parcel.status}</p>
        <p><strong>Created:</strong> ${moment(parcel.creation_date).format("LLL")}</p>
      `,
      icon: "info",
      confirmButtonColor: "#0ea5e9",
    });
  };

  const handlePay = async (parcel) => {
    const result = await Swal.fire({
      title: "Confirm Payment",
      text: `Pay ৳${parcel.cost} for this parcel?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
      confirmButtonColor: "#10b981",
    });

    if (result.isConfirmed) {
      // Add real API call here
      Swal.fire("Paid!", "Payment processed.", "success");
    }
  };

  const handleDelete = async (parcel) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot recover this parcel once deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/parcels/${parcel._id}`);
        Swal.fire("Deleted!", "Parcel has been removed.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to delete parcel.", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📦 My Parcels</h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-base-100">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Tittle</th>
              <th>Type</th>
              <th>Created</th>
              <th>Cost</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, idx) => (
                <tr key={parcel._id} className="hover">
                  <td>{idx + 1}</td>
                  <td className="max-w-[180px] truncate">{parcel.title}</td>
                  <td className="capitalize">{parcel.type}</td>
                  <td>{moment(parcel.creation_date).format("YYYY-MM-DD HH:mm")}</td>
                  <td>৳ {parcel.cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.status?.toLowerCase() === "paid"
                          ? "badge-success"
                          : "badge-error"
                      } text-white`}
                    >
                      {parcel.status?.toLowerCase() === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleView(parcel)}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye className="mr-1" /> View
                    </button>
                    <button
                      onClick={() => handlePay(parcel)}
                      disabled={parcel.status?.toLowerCase() === "paid"}
                      className="btn btn-sm btn-warning"
                    >
                      <FaMoneyCheckAlt className="mr-1" /> Pay
                    </button>
                    <button
                      onClick={() => handleDelete(parcel)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
