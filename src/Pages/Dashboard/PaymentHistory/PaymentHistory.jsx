import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner"; 

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">Error loading payments: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">💳 Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-sm md:text-base text-gray-700">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Parcel ID</th>
                <th className="border px-4 py-2">Tracking ID</th>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Amount (৳)</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(
                ({ _id, parcelId, trackingId, transactionId, amount, paid_at }, index) => (
                  <tr
                    key={_id}
                    className="text-center text-sm md:text-base hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 text-xs md:text-sm break-all">{parcelId}</td>
                    <td className="border px-4 py-2">{trackingId || "N/A"}</td>
                    <td className="border px-4 py-2 text-xs md:text-sm break-all">{transactionId}</td>
                    <td className="border px-4 py-2">৳ {parseFloat(amount).toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      {paid_at ? new Date(paid_at).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
