import { useMutation } from "react-query";
import useAxios from "../useAxios";
import { apiRoutes } from "./route";
import {
  ILoginRequest,
  ILoginResponce,
} from "@src/utils/@types/ILoginResponce";
import e from "cors";

const {
  login,
  signup,
  getProducts,
  getProductsByID,
  addwishList,
  deletewishList,
  clearwishList,
  getwishlistbyuserID,
  getCategories,
  addAddress,
  AddressList,
  createOrder,
  listEligableProduct,
  listProductwiseReviews,
  addProductwiseReviews,
  GetProductSummery,
  getProductByID,
  uploadReviews,
} = apiRoutes;

export const useUserLogin = () => {
  const { url, method } = login.POST;
  const callApi = useAxios();
  return useMutation<ILoginResponce, string, ILoginRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ILoginResponce;
  });
};

export const useUserSignup = () => {
  const { url, method } = signup.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};

export const useProductList = () => {
  const { url, method } = getProducts.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    console.log("API Call Data:", data);
    const response = await callApi({
      method,
      url,
      data,
    });
    console.log("API Response:", response);
    return response;
  });
};
export const useCategoryList = () => {
  const { url, method } = getCategories.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    console.log("API Call Data:", data);
    const response = await callApi({
      method,
      url,
      data,
    });
    console.log("API Response:", response);
    return response;
  });
};

export const useProductById = () => {
  const { url, method } = getProductsByID.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.id}`,
      data,
    });
    return response;
  });
};

export const useAddWishList = () => {
  const { url, method } = addwishList.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    console.log("useAddWishList called with data:", data);
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};

export const useDeleteWishList = () => {
  const { url, method } = deletewishList.DELETE;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.wishlistId}`,
      data,
    });
    return response;
  });
};

export const useClearWishList = () => {
  const { url, method } = clearwishList.DELETE;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};

export const useGetWishListByUserID = () => {
  const { url, method } = getwishlistbyuserID.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.userId}`,
      data,
    });
    return response;
  });
};
export const useAddAddress = () => {
  const { url, method } = addAddress.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};
export const useAddressList = () => {
  const { url, method } = AddressList.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};
export const useCreateOrder = () => {
  const { url, method } = createOrder.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};
export const useListEligableProduct = () => {
  const { url, method } = listEligableProduct.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};
export const useListProductwiseReviews = () => {
  const { url, method } = listProductwiseReviews.GET;
  const callApi = useAxios();
  console.log("useListProductwiseReviews called");

  return useMutation<any, string, any>(async (data) => {
    console.log("URL:", `${url}/${data.productId}/reviews`);
    const response = await callApi({
      method,
      url: `${url}/${data.productId}/reviews`,
      data,
    });
    return response;
  });
};
export const useAddProductwiseReviews = () => {
  const { url, method } = addProductwiseReviews.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.productId}/reviews`,
      data,
    });
    return response;
  });
};
export const useListProductwiseReviewsSummery = () => {
  const { url, method } = GetProductSummery.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.productId}/reviews`,
      data,
    });
    return response;
  });
};
export const useGetProductById = () => {
  const { url, method } = getProductByID.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    console.log("useGetProductById called with data:", data);
    const response = await callApi({
      method,
      url: `${url}/${data.productId}`,
      data,
    });
    return response;
  });
};
export const useUploadReviews = () => {
  const { url, method } = uploadReviews.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}/${data.productId}/reviews`,
      data,
    });
    return response;
  });
};
