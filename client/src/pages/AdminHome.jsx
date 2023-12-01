import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  deleteAdminStart,
  deleteAdminSuccess,
  deleteAdminFailure,
} from "../redux/admin/adminSlice"; //
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [filtered, setFiltered] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        const data = await response.json();
        setTotalUsers(data.totalUsers || []); // Update state with fetched user data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleFiltering = () => {
    try {
      const filteredRegex = new RegExp(filtered, "i");
      const filteredUsers = totalUsers.filter((user) =>
        filteredRegex.test(user.username)
      );
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdminDelete = async (id) => {
    //
    try {
      dispatch(deleteAdminStart()); //
      const res = await fetch(`/api/admin/admin-delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteAdminFailure(data)); //
        return;
      }
      const response = await fetch("/api/admin/dashboard");
      const updatedData = await response.json();
      setTotalUsers(updatedData.totalUsers || []);

      dispatch(deleteAdminSuccess(data)); //
    } catch (error) {
      dispatch(deleteAdminFailure(error)); //
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="px-4 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-700">Admin Dashboard</h1>
        <div>
          <div className="flex justify-center p-5">
            <div className="flex items-center">
              <div className="flex border border-purple-200 rounded">
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-black bg-slate-400 border rounded-md focus:border-grey-400 focus:ring-grey-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                  value={filtered}
                  onChange={(e) => setFiltered(e.target.value)}
                />
                <button
                  onClick={handleFiltering}
                  className="px-4 text-white bg-slate-900 border-l rounded "
                >
                  Search
                </button>
              </div>
              <div className="mt-4">
                <Link
                  className="block w-full px-4 py-5 ml-5  text-black bg-blue-300 border-l rounded"
                  to={"/admin/addUser"}
                >
                  Add New User
                </Link>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">List of Users:</h2>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length
                ? filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/editUser/${user._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleAdminDelete(user._id)}
                          className="ml-2 text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : totalUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/editUser/${user._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleAdminDelete(user._id)}
                          className="ml-2 text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
