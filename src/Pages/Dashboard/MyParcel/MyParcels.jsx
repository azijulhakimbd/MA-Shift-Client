import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // View
  const handleView = (parcel) => {
    Swal.fire({
      title: parcel.title,
      html: `
        <p><strong>Tracking ID:</strong> ${parcel.trackingId}</p>
        <p><strong>Type:</strong> ${parcel.type}</p>
        <p><strong>Sender:</strong> ${parcel.senderName} (${
        parcel.senderContact
      })</p>
        <p><strong>Receiver:</strong> ${parcel.receiverName} (${
        parcel.receiverContact
      })</p>
        <p><strong>Cost:</strong> ৳${parcel.cost ?? "N/A"}</p>
        <p><strong>Status:</strong> ${parcel.status}</p>
        <p><strong>Created:</strong> ${moment(parcel.creation_date).format(
          "LLL"
        )}</p>
      `,
      icon: "info",
      confirmButtonColor: "#0ea5e9",
    });
  };

  // Pay
  const handlePay = async (parcel) => {
    navigate(`/dashboard/payment/${parcel._id}`)
  }; 

  // Delete
  const handleDelete = async (parcel) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Parcel "${parcel.title}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/parcels/${parcel._id}`);
        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Parcel has been successfully removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          refetch(); // Refresh the list
        } else {
          throw new Error("Nothing was deleted");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire(
          "Error",
          "Failed to delete parcel. Try again later.",
          "error"
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        📦 My Parcels
      </h2>

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
                  <td>
                    {moment(parcel.creation_date).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td>৳ {parcel.cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.payment_status?.toLowerCase() === "paid"
                          ? "badge-success"
                          : "badge-error"
                      } text-white`}
                    >
                      {parcel.payment_status?.toLowerCase() === "paid"
                        ? "Paid"
                        : "Unpaid"}
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
