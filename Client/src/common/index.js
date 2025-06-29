const API_URL = import.meta.env.VITE_Server_URL

const API_ROUTES = {
  signUp: {
    url: `${API_URL}/signup`,
    method: 'POST',
  },
  signIn: {
    url: `${API_URL}/signin`,
    method: 'POST',
  },
  userDetails: {
    url: `${API_URL}/user-details`,
    method: 'GET',
  },
  logout: {
    url: `${API_URL}/logout`,
    method: 'GET',
  },
  allUsers: {
    url: `${API_URL}/all-users`,
    method: 'GET',
  },
  updateUser: {
    url: `${API_URL}/update-user`,
    method: 'POST',
  },
  deleteUser: {
    url: `${API_URL}/delete-user`,
    method: 'DELETE',
  },
  uploadProduct: {
    url: `${API_URL}/upload-product`,
    method: 'POST',
  },
  allProducts: {
    url: `${API_URL}/all-products`,
    method: 'GET',
  },
  updateProduct: {
    url: `${API_URL}/update-product`,
    method: 'POST',
  },
  deleteProduct: {
    url: `${API_URL}/delete-product`,
    method: 'DELETE',
  },
  categoryProducts: {
    url: `${API_URL}/category-products`,
    method: 'GET',
  },
  categoryWiseProduct: {
    url: `${API_URL}/category-wise-product`,
    method: 'POST',
  },
  getProductDetails: {
    url: `${API_URL}/get-product-details`,
    method: 'POST',
  },
  addToCart: {
    url: `${API_URL}/add-to-cart`,
    method: 'POST',
  },
  viewCart: {
    url: `${API_URL}/view-cart`,
    method: 'GET',
  },
  deleteCartItem: {
    url: `${API_URL}/delete-cart-item`,
    method: 'DELETE',
  },
  countCartItems: {
    url: `${API_URL}/count-cart-items`,
    method: 'GET',
  },
  updateCartItem: {
    url: `${API_URL}/update-cart-item`,
    method: 'POST',
  },
  searchProduct: {
    url: `${API_URL}/search-product`,
    method: 'POST',
  },
  payment: {
    url: `${API_URL}/payment`,
    method: 'POST',
  },
  getOrder : {
      url : `$${API_URL}/order-list`,
      method : 'get'
  },
  allOrder : {
      url : `${API_URL}/api/all-order`,
      method : 'get'
  },
  getOrderBySessionId: {
  url: `${API_URL}/get-order-by-session-id`,
  method: "GET",
},


};

export default API_ROUTES;