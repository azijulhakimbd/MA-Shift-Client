import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const Register = () => {
  const [profilepic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createUser(data.email, data.password);
      if (!res || !res.user) {
        throw new Error("User creation failed.");
      }

      const userinfo = {
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userinfo);

      const userProfile = {
        displayName: data.name,
        photoURL: profilepic,
      };

      await updateUserProfile(userProfile);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to MA SHIFT!",
      });

      navigate(from);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imageBB_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm shadow-md p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Create an Account
        </h1>
        <p className="mb-6 text-sm text-gray-500">Create account for MA SHIFT</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-accent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters or more.
              </p>
            )}
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forget Password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full border-none ${
              loading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-lime-300 text-black hover:bg-lime-400"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an Account?{" "}
          <Link className="text-green-600 hover:underline font-medium" to="/login">
            Login
          </Link>
        </div>

        <div className="divider text-sm">Or</div>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
