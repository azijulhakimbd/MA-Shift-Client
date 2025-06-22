import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import GoogleLogin from './GoogleLogin';

const Register = () => {
    const {register, handleSubmit, formState: { errors },}=useForm();
    const {createUser}= useAuth()
     const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(res =>{
      console.log(res.user);
      
    })
    .catch(error =>{
      console.log(error);
      
    })
    
  };
    return (
        <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm shadow-md p-8 rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Create an Account</h1>
        <p className="mb-6 text-sm text-gray-500"> Create account for MA SHIFT</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
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
            <input type="file"  {...register("file", { required: true })} className="file-input file-input-accent" />
            {errors.file?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Photo is required</p>
            )}
          </div>
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
            Register
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
         Already have Account?{" "}
          
            <Link className="text-green-600 hover:underline font-medium" to={"/login"}>Login</Link>
         
        </div>

        <div className="divider text-sm">Or</div>

        <GoogleLogin></GoogleLogin>
      </div>
    </div>
    );
};

export default Register;