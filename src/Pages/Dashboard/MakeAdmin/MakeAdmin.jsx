import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MakeAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryKey, setQueryKey] = useState(""); // trigger query manually
  const axiosSecure = useAxiosSecure();

  // TanStack Query
  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["search-user", queryKey],
    enabled: !!queryKey, // only run when queryKey is set
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${queryKey}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setQueryKey(searchTerm.trim()); // trigger query
  };

  const handleMakeAdmin = async (email) => {
    const res = await axiosSecure.patch(`/users/admin/${email}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", `${email} is now an admin`, "success");
      refetch();
    }
  };

  const handleRemoveAdmin = async (email) => {
    const res = await axiosSecure.patch(`/users/remove-admin/${email}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Removed", `${email} is no longer an admin`, "success");
      refetch();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Admin Access</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email keyword"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isError && (
        <p className="text-red-500 text-sm">Error fetching users</p>
      )}

      {users.length > 0 && (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.email}
              className=" p-4 rounded bg-gray-100"
            >
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>

              <div className="mt-4">
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRemoveAdmin(user.email)}
                    className="btn btn-warning"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user.email)}
                    className="btn btn-success"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
