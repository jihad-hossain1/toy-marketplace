import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";

const useCart = () => {
  const { user, loading } = useContext(AuthContext)
  const { refetch, data: cart = [] ,isError,isLoading,error} = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/carts?email=${user?.email}`);
      return res.data;
    },
  });

  return [cart, refetch ,isError,isLoading,error];
};
export default useCart;