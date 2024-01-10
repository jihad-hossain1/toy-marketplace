// carts_by_user_email
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { AuthContext } from "../authentication/AuthProvider";

const useUserCart = () => {
    const { user, loading } = useContext(AuthContext);

    const { refetch, data: carts = [] } = useQuery({
        queryKey: ["carts", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_BASE_URL}/carts?email=${user?.email}`);
            // console.log("res from axios", res);

            return res.data;
        },
    });

    return [carts, refetch];
};
export default useUserCart;

