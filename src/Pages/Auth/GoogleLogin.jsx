import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from =location.state?.from || '/';

  const handleSubmit = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        navigate(from)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        onClick={handleSubmit}
        className="btn w-full bg-white text-black border border-[#e5e5e5] hover:bg-gray-100"
      >
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
  );
};

export default GoogleLogin;
