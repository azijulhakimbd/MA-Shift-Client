import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MakeAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["search-user", queryKey],
    enabled: !!queryKey,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search/${queryKey}`); // ✅ UPDATED
      return Array.isArray(res.data) ? res.data : [res.data];
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setQueryKey(searchTerm.trim());
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
    <div className="mx-auto p-10 bg-white shadow-md rounded">
      <h2 className="text-4xl font-bold mb-10">Manage Admin Access</h2>

      {/* Search Form */}
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

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm mb-4">Error fetching users.</p>
      )}

      {/* Result Table */}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.email}>
                  <td>{idx + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user.email)}
                        className="btn btn-sm btn-warning"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="btn btn-sm btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        queryKey &&
        !isLoading && (
          <p className="text-center text-gray-500 mt-6">No users found.</p>
        )
      )}
    </div>
  );
};

export default MakeAdmin;
