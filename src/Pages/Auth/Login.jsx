import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    
  };
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm shadow-md p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="mb-6 text-sm text-gray-500">Login with MA SHIFT</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="input input-bordered w-full"
            />
          </div>

          {/* password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {/* forget password */}
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
          <a href="#" className="text-green-600 hover:underline font-medium">
            Register
          </a>
        </div>

        <div className="divider text-sm">Or</div>

        {/* Google login */}
        <button className="btn w-full bg-white text-black border border-[#e5e5e5] hover:bg-gray-100">
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
