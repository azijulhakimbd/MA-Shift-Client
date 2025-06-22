import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import 'aos/dist/aos.css';
import Aos from "aos";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
Aos.init()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist bg-[#EAECED] max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
