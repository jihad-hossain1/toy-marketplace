import { IconButton } from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { CgMathMinus } from "react-icons/cg";
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
} from "../../../redux/features/api/userApi";
import { useSelector } from "react-redux";

const ManageCartQuantity = ({ quantity, productId }) => {
   const user = useSelector((state) => state.auth?.userData);

  const userId = user?._id;

  const [increaseCartProduct] = useIncreaseCartProductMutation() || {};
  const [decreaseCartProduct] = useDecreaseCartProductMutation() || {};

  const handleIncreaseCartProduct = () => {
    increaseCartProduct({ userId: userId, productId: productId });
  };

  const handleDecreaseCartProduct = () => {
    decreaseCartProduct({ userId: userId, productId: productId });
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <IconButton
          size="sm"
          variant="outlined"
          className="rounded-full border border-gray-500 "
          onClick={() => handleIncreaseCartProduct()}
        >
          <GoPlus />
        </IconButton>
        <button className="px-2">{quantity}</button>
        <IconButton
          onClick={() => handleDecreaseCartProduct()}
          size="sm"
          variant="outlined"
          className="rounded-full border border-gray-500 "
        >
          <CgMathMinus />
        </IconButton>
      </div>
    </div>
  );
};

export default ManageCartQuantity;
