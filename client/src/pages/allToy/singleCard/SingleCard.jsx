import { TbEye } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import toast, { Toaster } from "react-hot-toast";
import WhitelistButton from "./WhitelistButton";
import { useAddToCartMutation } from "../../../redux/features/api/userApi";

const SingleCard = ({ card }) => {
  const { price, image, toyTitle, rating, quantity } = card;
  const userId = "65283decc56a5ba37161e5f1";

  const [addToCart, { data, isError, error, isSuccess }] =
    useAddToCartMutation() || {};

  const handleCart = async (pid, qty) => {
    addToCart({ userId: userId, item: { id: pid, quantity: qty } });
  };

  if (isError) {
    return toast.error(`${error?.error}`);
  }
  if (isSuccess) {
    toast.success(`${toyTitle} add on cart`);
  }
  // console.log(data);
  return (
    <div>
      <div className="group">
        <Toaster />
        <div className="relative overflow-hidden flex justify-center">
          <div
            className={
              quantity <= 0 ? "block transition-all duration-300" : "hidden"
            }
          >
            <button
              className={
                "group-hover:-left-16 transition-all duration-300 absolute px-2 text-xs bg-red-700 text-white rounded"
              }
            >
              Sold out
            </button>
          </div>
          <img src={image} alt="toy photo" className="object-cover" />

          <div className="btn3">
            <div className="flex justify-end ">
              <div className="flex flex-col mr-4 mt-2">
                <Link to={`/singletoy/${card?._id}`}>
                  <button className="btn2">
                    <TbEye className="h-5 w-5" />
                  </button>
                </Link>
                {/* whitelist button  */}
                <WhitelistButton item={card} />
              </div>
            </div>

            <div className="flex justify-center mb-1">
              <button
                onClick={() => handleCart(card?._id, 1)}
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

export default SingleCard;