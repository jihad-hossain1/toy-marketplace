import toast, { Toaster } from "react-hot-toast";
import { useAddToCartMutation } from "../../../redux/features/api/userApi";
import { useSelector } from "react-redux";

const AddToCartButton = ({ pid, quantity }) => {
   const user = useSelector((state) => state.auth?.userData);
   const userId = user?._id;

   const [addToCart, { data, isError, error, isSuccess }] =
     useAddToCartMutation() || {};

   const handleCart = async (pid, qty) => {
     if (!user) {
       return toast.error("<---- Login first ---->");
     }
     addToCart({ userId: userId, item: { id: pid, quantity: qty } });
   };

  if (isError) {
    return toast.error(`${error?.error}`);
  }
  if (isSuccess) {
    toast.success(`Product add to cart`);
  }
  return (
    <div>
      <div className="space-x-4 mt-4 mb-4">
        <button
          onClick={() => handleCart(pid, 1)}
          disabled={quantity == 0}
          className="bg-[#f0c507] px-4 py-2 md:px-6 md:py-3 rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#fc82bd] hover:text-white transition-all duration-500"
        >
          add to cart
        </button>
        <button className="bg-[#fc82bd] px-4 py-2 md:px-6 md:py-3 rounded text-black text-xs md:text-[14px] inline-block uppercase hover:bg-[#f0c507] hover:text-white transition-all duration-500">
          Buy it now
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;
