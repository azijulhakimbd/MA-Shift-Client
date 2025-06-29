import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAddTrackingUpdate = () => {
  const axiosSecure = useAxiosSecure();

  const {
    mutate: addTracking,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ trackingId, parcelId, status, location }) => {
      const res = await axiosSecure.post("/tracking", {
        trackingId,
        parcelId,
        status,
        location,
      });
      return res.data;
    },
  });

  return { addTracking, isPending, isSuccess, isError, error };
};

export default useAddTrackingUpdate;
