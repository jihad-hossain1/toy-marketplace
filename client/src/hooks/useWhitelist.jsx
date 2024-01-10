// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import axios from "axios";

const useWhitelist = () => {
  const { user, loading } = useContext(AuthContext)
  const { refetch: isWhitelistRefetch, data: whitelist = [] ,isLoading,isError,error } = useQuery({
    queryKey: ["whitelists", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/whitelist?email=${user?.email}`);
      return res.data;
    },
  });

  return [whitelist,isWhitelistRefetch,isLoading,isError,error];
};
export default useWhitelist;