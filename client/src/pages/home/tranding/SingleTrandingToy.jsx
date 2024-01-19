import { TbEye } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import toast, { Toaster } from "react-hot-toast";
import WhitelistButton from "../../allToy/singleCard/WhitelistButton";
import { useAddToCartMutation } from "../../../redux/features/api/userApi";
import { useSelector } from "react-redux";

const SingleTrandingToy = ({ ite }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { price, image, toyTitle, rating, quantity } = ite;
  const userId = user?._id;

  const [addToCart, { data, isError, error, isSuccess }] =
    useAddToCartMutation() || {};

  const handleCart = async (pid, qty) => {
    if (!isAuthenticated) {
      return toast.error("<---- Login first ---->");
    } else {
      addToCart({ userId: userId, item: { id: pid, quantity: qty } });
    }
  };

  if (isError) {
    return toast.error(`${error?.error}`);
  }
  if (isSuccess) {
    toast.success(`Product add on cart`);
  }
  return (
    <div className="max-w-[300]">
      <div className="group">
        <Toaster />

        <div className="relative overflow-hidden">
          <img src={image} alt="" />

          <div className="btn3">
            <div className="flex justify-end ">
              <div className="flex flex-col mr-4 mt-2">
                <Link to={`/singletoy/${ite?._id}`}>
                  <button className="btn2">
                    <TbEye className="h-5 w-5" />
                  </button>
                </Link>
                <WhitelistButton item={ite} />
              </div>
            </div>

            <div className="flex justify-center mb-1">
              <button
                onClick={() => handleCart(ite?._id, 1)}
                disabled={quantity == 0}
                className="btn1"
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
          <h4 className="text-sm md:text-xl">{toyTitle}</h4>
          <Rate disabled defaultValue={rating} className="text-sm" />
          <h4 className="text-sm md:text-md font-semibold">
            <span className="text-blue-gray-600 line-through">
              ${price - 10}.00
            </span>{" "}
            <span>${price}.00</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleTrandingToy;
