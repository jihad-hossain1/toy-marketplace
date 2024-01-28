import { BsPencilSquare } from "react-icons/bs";
import ModalForAll from "../../../../components/ModalForAll/ModalForAll";
import { useState } from "react";
import { useUpdateProductCategoryMutation } from "../../../../redux/features/api/productCategoryApi";
import { Button, Input } from "@material-tailwind/react";
import toast from "react-hot-toast";

const UpdateCategory = ({ category }) => {
  const [open, setOpen] = useState(false);

  const [updateCategory, { data, isError, isLoading, isSuccess, error }] =
    useUpdateProductCategoryMutation() || {};

  const scafolding = {
    category: "",
  };

  const [formData, setformData] = useState(scafolding);

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateCategory({ id: category?._id, data: { ...formData } });

    setOpen(false);
  };
  //   if (isSuccess) {
  //     return toast.success("category updated successfull");
  //   }
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <BsPencilSquare size={22} />
      </button>

      <ModalForAll title={"update category"} open={open} setOpen={setOpen}>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            required
            label="Categroy"
            type="text"
            name="category"
            color="pink"
            variant="outlined"
            className="border p-4"
            defaultValue={category?.category}
            onChange={handleChange}
          />
          <span className="text-red-700">
            {isError ? error.data?.error : ""}
          </span>
          <Button type="submit" color="pink" className="mt-3">
            {isLoading ? "loading.." : "Submit"}
          </Button>
        </form>
      </ModalForAll>
    </>
  );
};

export default UpdateCategory;
