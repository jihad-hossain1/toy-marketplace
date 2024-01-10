import { useQuery } from "@tanstack/react-query";

export const useReview = () => {
    const {
        data: reviews = [],
        isLoading: loading,
        refetch,
        isError
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`);
            return res.json();
        },
    });

    return [reviews,refetch,loading,isError];
};