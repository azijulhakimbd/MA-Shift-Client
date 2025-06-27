import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import 'aos/dist/aos.css';
import Aos from "aos";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
Aos.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist bg-[#EAECED] lg:mx-24">
     <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     </QueryClientProvider>
    </div>
  </StrictMode>
);
