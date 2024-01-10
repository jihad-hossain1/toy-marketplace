import SingleCard from "./singleCard/SingleCard";
import ProductFilter from "../../components/productFilter/ProductFilter";
import { useGetProductsByPageQuery } from "../../redux/features/api/productApi";
import Skeleton from "../../components/skeleton/Skeleton";
import { useSelector } from "react-redux";
import PaginatedProducts from "./PaginatedProducts";

const AllToy = () => {
  const { pageNumber, limit } = useSelector((state) => state?.products);
  const {
    data: products,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductsByPageQuery(pageNumber);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="min-h-[60vh]">
      <section className=" pb-6 mx-3 mb-2 ">
        <div className="hidden lg:block ">
          <div className="border border-blue-gray-100/70 p-3 drop-shadow-sm shadow-sm rounded-lg bg-blue-gray-50 bg-opacity-50 w-full">
            <ProductFilter products={products?.data} />
          </div>
        </div>
        <div className="mt-3 min-h-[60vh]">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((item, ind) => (
                <Skeleton key={ind} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {products?.data?.map((card) => (
                <SingleCard key={card?._id} card={card} />
              ))}
            </div>
          )}
        </div>
        <div className="">
          <PaginatedProducts
            // limitPerPage={products?.limit}
            currentPage={products?.currentPage}
            numberOfPage={products?.numberOfPages}
            // total_page={products?.total_page}
          />
        </div>
      </section>
    </main>
  );
};

export default AllToy;
