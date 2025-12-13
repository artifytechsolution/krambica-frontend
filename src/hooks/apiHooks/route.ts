import { BASE_URL } from "@src/config/config";
import { clear } from "console";

export const apiRoutes = {
  login: {
    POST: {
      query: "Login",
      method: "POST",
      url: `${BASE_URL}/api/auth/login`,
    },
  },
  signup: {
    POST: {
      query: "Signup",
      method: "POST",
      url: `${BASE_URL}/api/auth`,
    },
  },
  getProducts: {
    POST: {
      query: "ProductsList",
      method: "POST",
      url: `${BASE_URL}/api/products/productlist`,
    },
  },
  getProductByID: {
    GET: {
      query: "ProductsById",
      method: "GET",
      url: `${BASE_URL}/api/products`,
    },
  },
  getCategories: {
    GET: {
      query: "CategoriesList",
      method: "GET",
      url: `${BASE_URL}/api/categories`,
    },
  },
  getProductsByID: {
    GET: {
      query: "GetProduct",
      method: "GET",
      url: `${BASE_URL}/api/products`,
    },
  },
  addwishList: {
    POST: {
      query: "AddWishList",
      method: "POST",
      url: `${BASE_URL}/api/products/wishlist/add`,
    },
  },
  //here put wishlist id
  deletewishList: {
    DELETE: {
      query: "DeleteWishList",
      method: "DELETE",
      url: `${BASE_URL}/api/products/wishlist/remove`,
    },
  },
  clearwishList: {
    DELETE: {
      query: "ClearWishList",
      method: "DELETE",
      url: `${BASE_URL}/api/products/wishlist/clear`,
    },
  },
  getwishlistbyuserID: {
    GET: {
      query: "GetWishListByUserID",
      method: "GET",
      url: `${BASE_URL}/api/products/wishlist`,
    },
  },
  addAddress: {
    POST: {
      query: "ADD ADDRESS",
      method: "POST",
      url: `${BASE_URL}/api/auth/address`,
    },
  },
  AddressList: {
    POST: {
      query: "ADD ADDRESS",
      method: "POST",
      url: `${BASE_URL}/api/auth/addressList`,
    },
  },
  createOrder: {
    POST: {
      query: "CREATE ORDER",
      method: "POST",
      url: `${BASE_URL}/api/orders`,
    },
  },
  listEligableProduct: {
    POST: {
      query: "ELIGABLE PRODUCT",
      method: "POST",
      url: `${BASE_URL}/api/promotion/ListEligibleProducts`,
    },
  },
  listProductwiseReviews: {
    GET: {
      query: "PRODUCT REVIEWS",
      method: "GET",
      url: `${BASE_URL}/api/review/products`,
    },
  },
  addProductwiseReviews: {
    POST: {
      query: "ADD PRODUCT REVIEW",
      method: "POST",
      url: `${BASE_URL}/api/review/products`,
    },
  },
  GetProductSummery: {
    GET: {
      query: "PRODUCT SUMMERY",
      method: "GET",
      url: `${BASE_URL}/api/review/products`,
    },
  },
};
