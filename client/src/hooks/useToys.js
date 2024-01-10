import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useToys = () => {
    const { data: toys = [], isLoading, isError, refetch } = useQuery(["toys"], async () => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/toys`);
    
        return res.data;
    });

    return [toys, refetch, isLoading, isError];
};