import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAdminStart,
  updateAdminSuccess,
  updateAdminFailure,
} from "../redux/admin/adminSlice";

const AdminEditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.admin);
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [updateSuccess,setUpateSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/fetchData/${id}`);
        const data = await response.json();
        if (data && data.user) {
          setUserInfo({
            username: data.user.username || "",
            email: data.user.email || "",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [id]);

  console.log(userInfo);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setUserInfo({ ...userInfo, [id]: value });
    //console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateAdminStart());
      const res = await fetch(`/api/admin/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
     // navigate("/admin_home");
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateAdminFailure(data));
        return;
      }
      dispatch(updateAdminSuccess(data));
      setUpateSuccess(true);
    } catch (error) {
      dispatch(updateAdminFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Edit User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={userInfo.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          value={userInfo.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User updated successfully!'}</p>
    </div>
  );
};

export default AdminEditUser;
