import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p>Error loading payments: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-sm md:text-base">
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
                  <tr key={_id} className="text-center text-sm md:text-base">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{parcelId}</td>
                    <td className="border px-4 py-2">{trackingId || "N/A"}</td>
                    <td className="border px-4 py-2">{transactionId}</td>
                    <td className="border px-4 py-2">{amount}</td>
                    <td className="border px-4 py-2">
                      {new Date(paid_at).toLocaleString()}
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
