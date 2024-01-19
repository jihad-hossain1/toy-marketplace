const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const dotenv = require("dotenv");
const { asyncHandlerPromise } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");
const { uploadOnCloudinary } = require("../utils/cloudinary");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went while generating refresh and access token"
    );
  }
};

const createUser = async (req, res) => {
  const isReq = req.body;

  try {
    const isCreate = await User.create(isReq);
    res.status(201).json(isCreate);
  } catch (error) {
    res.status(404).json({ message: "failed to create user", error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "failed to fetch user", error: error });
  }
};

const getUserWithCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cart.product"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const uid = req.params?.id;
  try {
    if (mongoose.Types.ObjectId.isValid(uid)) {
      const user = await User.findById(uid);
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    throw new Error("user not found");
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params?.id;
  try {
    const user = await User.findByIdAndDelete(uid);
    res.json(user);
  } catch (error) {
    return res.json({ message: `something get error ${error}` });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params?.id;
  let body = req.body;
  try {
    const updatetUser = await User.findByIdAndUpdate(uid, {
      $set: body,
    });
    res.status(201).json(updatetUser);
  } catch (error) {
    return res.json({ message: error });
  }
};

const addUserCart = async (req, res) => {
  // console.log(req.params.userId);
  const userId = req.params.userId;
  console.log(userId);
  try {
    const { id, quantity } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(id);
    // console.log(user, product);
    if (!user || !product) {
      return res.status(404).json({ error: "User or product not found" });
    }

    const existingCartItem = user.cart?.find(
      (item) => String(item.product._id) === String(id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ product: product._id, quantity });
    }
    // user.cart.push({ product: product._id, quantity });
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const increaseCartProduct = async (req, res) => {
  const _pid = req.params.userId;
  // console.log("user id : ", _pid);
  const _id = req.body.productId;
  // console.log(id);
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) => item._id == productId);
    // console.log(cartItem);
    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Product not found in the user's cart" });
    }
    // let product;
    // try {
    //   product = await Product.findById(productId);
    //   if (!product) {
    //     throw new Error("Product not found");
    //   }
    // } catch (productError) {
    //   console.error("Error finding product:", productError);
    //   return res.status(404).json({ error: "Product not found" });
    // }
    // if (!product) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    // if (product?.quantity < cartItem?.quantity + 1) {
    //   return res
    //     .status(400)
    //     .json({ error: "Insufficient stock to increase quantity" });
    // }
    // Increase the quantity by 1
    cartItem.quantity += 1;

    await user.save();

    res.json({ message: "Product quantity increased in the user's cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decreaseCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find((item) => item._id == productId);

    if (!cartItem) {
      return res
        .status(404)
        .json({ error: "Product not found in the user's cart" });
    }

    // Decrease the quantity by 1 (assuming minimum quantity is 1)
    cartItem.quantity = Math.max(1, cartItem.quantity - 1);

    await user.save();

    res.json({ message: "Product quantity decreased in the user's cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const paymentByStripe = async (req, res) => {
  try {
    const { total, cartsItem, userId } = req.body;
    console.log(cartsItem, userId, total);

    if (total && userId && cartsItem) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        payment_method_types: ["card"],
      });

      const deliveryInfo = {
        transactionId: paymentIntent?.id,
        products: cartsItem.map(({ product, quantity }) => ({
          productId: product?._id,
          quantity,
        })),
      };
      await User.findByIdAndUpdate(userId, {
        $push: { deliveries: deliveryInfo },
        $pull: { cart: { _id: { $in: cartsItem } } },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(404).json({ message: "amount not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const deleteUserProduct = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  // console.log(userId, productId);

  try {
    // Find the user's cart
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Remove the product from the cart
    user.cart.pull(productId);

    // Save the updated cart
    await user.save();

    res.json({ message: "Product removed from the cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = asyncHandlerPromise(async (req, res) => {
  // get user details = require fronend
  const { fullname, username, password, email } = req.body;
  console.log(req.body);

  // validation - not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields is required");
  }

  // check if user already exists: username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or usernaem already exist");
  }

  // check for images, check for avatar
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // // const avatarLocalPath = req.files?.avatar[0]?.path;

  // let coverImageLocalPath;
  // // console.log("= require if ... ", Array.isArray(req.files?.coverImage));
  // if (
  //   req.files &&
  //   Array.isArray(req.files?.coverImage) &&
  //   req.files?.coverImage?.length > 0
  // ) {
  //   coverImageLocalPath = req.files.coverImage[0].path;
  // }

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "avatar file is required");
  // }

  // // upload them to cloudinary, avatar
  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // if (!avatar) {
  //   throw new ApiError(400, "Avater is required");
  // }

  // create user object - crate entry in db
  const user = await User.create({
    fullname,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password and refresh token field = require response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registring the user");
  }

  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register successfully"));

  //   res.status(200).json({
  //     message: "ok",
  //   });
});

const loginUser = asyncHandlerPromise(async (req, res) => {
  // req body -> data
  const { email, username, password } = req.body;

  // username or email
  if (!email && !username) {
    throw new ApiError(400, "username or password is required");
  }

  // find the user
  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(400, "user does not exist");
  }

  // password check
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("password encryption ----> ", isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials || wrong password");
  }

  // access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // send cookie
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandlerPromise(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user successfully loggedOut ..."));
});

const getCurrentUser = asyncHandlerPromise(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfull"));
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserWithCart,
  addUserCart,
  deleteUserProduct,
  increaseCartProduct,
  decreaseCartProduct,
  paymentByStripe,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
};
