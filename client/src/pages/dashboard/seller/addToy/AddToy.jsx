import { Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../authentication/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useAddProductMutation } from "../../../../redux/features/api/productApi";
import SingleInformation from "./SingleInformation";
import { useSelector } from "react-redux";

const AddToy = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [_photo, setPhoto] = useState("");

  const [addProduct, { data: product, isError, isLoading, isSuccess, error }] =
    useAddProductMutation() || {};
  // const email = "jihadkhan934@gmail.com";

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ ...formData, email, _photo });
    if (!user) {
      return toast.error("user not found");
    }
    addProduct({ ...formData, email: user?.email, image: _photo });
    if (isError) {
      toast.error(`${error}`);
      console.log(error);
    }
    toast.success(`${formData?.toyTitle} added successfull`);
  };

  const scafolding = {
    toyTitle: "",
    price: "",
    quantity: "",
    category: "",
    details: {
      productDetails: {
        SetContent: "One soft toy",
        Type: "Doll",
        Material: "Polyester",
        OperationMode: "Manual",
        Colour: "Brown,pink and red",
        SuitableAge: "2 Years plus",
        Features: "Polyester",
        Filling: "Polyfill",
      },

      size: {
        Box: "20 cm",
        BowLength: "20 cm",
        Arrowlength: "20 cm",
        TargetBoardSize: "20 cm",
        ToyLength: "50 cm",
        Dimension: "27 cm (Length )",
      },
      images: { images: ["imgage url 1", "image url 2"] },
      // toyDescription: {[]},
      specifications: {
        OperationMode: "Manual Operation",
        MultipackSet: "Single",
        Features: "Non-Allergic",
      },
      colors: {
        colors: ["yello", "green", "red"],
      },
      seller: {
        company: "Haitain Marketing and Consulting Pvt Ltd",
        location:
          "H.no 704 ground floor,Ghitorini, New Delhi -110030,Near MCD SchoolNew Delhi , Delhi - 110030",
      },
      materialCare: {
        metarial: ["Polyester"],
      },
    },
  };
  const [formData, setFormData] = useState(scafolding);

  // console.log(product);
  // console.log(error);
  return (
    <div>
      <Toaster />
      <div>
        <h4 className="text-xl text-center font-bold underline text-blue-gray-800 mb-4 md:mb-8">
          Add Your Toy
        </h4>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="md:gap-3 gap-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <SingleInformation
            formData={formData}
            handleChange={handleChange}
            setPhoto={setPhoto}
            _photo={_photo}
          />
        </div>
        {/*  product details section  */}
        {/* TODO */}
        <h4 className="my-4 ">Toy Description section</h4>
        <div className="my-10">
          <Button
            variant="gradient"
            color="pink"
            className="w-[200px]"
            type="submit"
          >
            {" "}
            Submit{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddToy;
