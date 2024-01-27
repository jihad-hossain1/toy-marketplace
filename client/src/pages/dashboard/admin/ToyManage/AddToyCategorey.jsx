import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAddProductCategroyMutation } from "../../../../redux/features/api/productCategoryApi";
// import { useAddProductCategoryMutation } from "../../../../redux/features/api/productApi";

const AddToyCategorey = () => {
  const [addProductCategory, { data, isError, isLoading, isSuccess, error }] =
    useAddProductCategroyMutation();

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

    await addProductCategory({ ...formData });
  };

  return (
    <div>
      <h4 className="text-center text-2xl font-semibold">AddToyCategorey</h4>

      <div className="max-w-screen-md mx-auto p-3 flex flex-col gap-6">
        {isSuccess ? (
          <span className="text-center text-sm p-4 w-fit border-green-500 bg-green-50 rounded shadow-sm">
            {data?.message}
          </span>
        ) : (
          ""
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            required
            label="Categroy"
            type="text"
            name="category"
            color="pink"
            variant="outlined"
            className="border p-4"
            defaultValue={formData.category}
            onChange={handleChange}
          />
          <span className="text-red-700">
            {isError ? error.data?.error : ""}
          </span>
          <Button type="submit" color="pink" className="mt-3">
            {isLoading ? "loading.." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddToyCategorey;
