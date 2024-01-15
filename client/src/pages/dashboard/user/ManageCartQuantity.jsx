import { IconButton } from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { CgMathMinus } from "react-icons/cg";
import { useIncreaseCartProductMutation } from "../../../redux/features/api/userApi";

const ManageCartQuantity = ({ quantity, productId }) => {
  const userId = "65283decc56a5ba37161e5f1";

  const [increaseCartProduct] = useIncreaseCartProductMutation() || {};

  const handleIncreaseCartProduct = () => {
    increaseCartProduct({ userId: userId, productId: productId });
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
