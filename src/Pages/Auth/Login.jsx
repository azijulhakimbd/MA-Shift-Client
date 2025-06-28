import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signIn}= useAuth();
  const location=useLocation();
  const from =location.state?.from || '/';
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data.email, data.password).then(res =>{
      console.log(res.user);
      navigate(from)
    }).cath(error =>{
      console.log(error);
      
    })
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm shadow-md p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="mb-6 text-sm text-gray-500">
          Login with MA SHIFT
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          

          {/* email */}
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

          {/* password */}
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
                Password must be 6 character or more.
              </p>
            )}
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forget Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-lime-300 text-black border-none hover:bg-lime-400"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Don’t have any account?{" "}
          <Link
            className="text-green-600 hover:underline font-medium"
            to={"/register"}
          >
            Register
          </Link>
        </div>

        <div className="divider text-sm">Or</div>

        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
