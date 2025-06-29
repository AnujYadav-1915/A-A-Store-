const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const userSignUp = require('./controller/UserSignUp');
const userSignIn = require('./controller/UserSignIn');
const userDetails = require('./controller/UserDetails');
const authToken = require('./middleware/authToken');
const userLogout = require('./controller/UserLogOut');
const getAllUser = require('./controller/AllUser');
const updateUser = require('./controller/updateUser');
const deleteUser = require('./controller/deleteUser');
const isAdmin = require('./middleware/isAdmin');
const UploadProductController = require('./controller/UploadProductController');
const getProduct = require('./controller/getProduct');
const updateProductController = require('./controller/updateProduct');
const deleteProductController = require('./controller/deleteProduct');
const getCategoryProduct = require('./controller/getCategoryProduct');
const getCategoryWiseProduct = require('./controller/getCategoryWiseProduct');
const getProductDetails = require('./controller/getProductDetails');
const addToCartController = require('./controller/addToCartController');
const addToCartViewProduct = require('./controller/addToCartViewProduct');
const deleteAddToCartProduct = require('./controller/deleteAddToCartProduct');
const countAddToCartProduct = require('./controller/countAddToCartProduct');
const updateAddToCartProduct = require('./controller/updateAddToCartProduct');
const searchProduct = require('./controller/searchProduct');
const paymentController = require('./controller/paymentController');
const webhooks = require('./controller/Webhook');
const orderController = require('./controller/order.controller');
const allOrderController = require('./controller/allOrders.controller');
const getOrderBySessionId = require('./controller/getOrderBySessionId');



const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true, 
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.post('/api/signup', userSignUp);
app.post('/api/signin', userSignIn);
app.get('/api/user-details',authToken, userDetails);
app.get('/api/logout', userLogout);

app.get('/api/all-users',authToken, getAllUser);
app.post('/api/update-user', authToken, updateUser);
app.delete("/api/delete-user/:id", authToken, isAdmin, deleteUser);

//Products ki kahani
app.post('/api/upload-product', authToken, UploadProductController);
app.get('/api/all-products', getProduct);
app.post('/api/update-product', authToken, updateProductController);
app.delete('/api/delete-product/:id', authToken, isAdmin, deleteProductController);
app.get('/api/category-products', getCategoryProduct);
app.post('/api/category-wise-product', getCategoryWiseProduct);
app.post('/api/get-product-details', getProductDetails);

app.post('/api/add-to-cart', authToken, addToCartController);
app.get('/api/view-cart', authToken, addToCartViewProduct);
app.delete('/api/delete-cart-item', authToken, deleteAddToCartProduct);
app.get('/api/count-cart-items', authToken, countAddToCartProduct);
app.post('/api/update-cart-item', authToken, updateAddToCartProduct);
app.get('/api/search-product', searchProduct);

app.post('/api/payment', authToken, paymentController);
app.post('/webhook',webhooks) // /api/webhook
app.get("/order-list",authToken,orderController)
app.get("/all-order",authToken,allOrderController)
app.get('/get-order-by-session-id', authToken, getOrderBySessionId)


connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB Connected: `);
    });
});

const PORT = process.env.PORT || 5000;