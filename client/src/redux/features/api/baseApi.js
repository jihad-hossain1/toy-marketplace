import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL2 } from "../../../constants";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL2 }),
  endpoints: () => ({}),
});
export default baseApi;
