import React, {  useState } from 'react'
import productCategory from '../helper/productCategory'
import uploadImage from '../helper/uploadImage';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import FullImage from './FullImage';
import API_ROUTES from '../common';
import {toast} from 'react-toastify'
const AdminViewProduct = ({
  productData,
  setEditProductModal,
  fetchdata
}) => {
    const [data, setData] = useState({
      ...productData,
       productName :  productData?.productName || "",
       brandName :  productData?.brandName || "",
       category :  productData?.category || "",
       productImage :  productData?.productImage || [],
       description :  productData?.description || "",
       price :  productData?.price || "",
       sellingPrice :  productData?.sellingPrice || "",
       stock :  productData?.stock || "",
    });

const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
const [fullScreenImage,setFullScreenImage] = useState("")



  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }

    const handleSubmit = async (e) => {
        e.preventDefault();        

    const response = await fetch(API_ROUTES.updateProduct.url, {
      method: API_ROUTES.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        setEditProductModal(false)
        fetchdata()
        
    }

    if(responseData.error){
      toast.error(responseData?.message)
  }
}

  return (
   <div className="p-4 bg-[#F9FAFB] h-[50vh] scroll-absolute overflow-y-auto    ">
      <h2 className="text-2xl font-semibold mb-4">Edit Products :</h2>

      <form  className="bg-white rounded-xl shadow-md p-6">
        <div>
        <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">Product Name :</label>
          <input
            type="text"
            placeholder="Enter product name"
            name="productName"
            id="ProductName"
            onChange={handleOnChange}
            value={data.productName}
            className="my-2 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name :</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            onChange={handleOnChange}
            value={data.brandName}
            placeholder="Enter product brand name"
            className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ProductCategory" className="block text-sm font-medium text-gray-700">Category :</label>
            <select
                id="ProductCategory"
                name="category"
                onChange={handleOnChange}
                value={data.category}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
                <option value="" disabled>Select a category</option>
                {productCategory.map((category) => (
                    <option key={category.id} value={category.value}>
                        {category.label}
                    </option>
                ))}
                
            </select>
        </div>


        <div className="mb-4">
          <label htmlFor="ProductPrice" className="block text-sm font-medium text-gray-700">Price(₹) :</label>
          <input
            type="number"
            id="ProductPrice"
            name="price"
            onChange={handleOnChange}
            value={data.price}
            className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="SellingPrice" className="block text-sm font-medium text-gray-700">Selling Price(₹) :</label>
          <input
            type="number"
            id="SellingPrice"
            name="sellingPrice"
            onChange={handleOnChange}
            value={data.sellingPrice}
            className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter product selling price"
          />
        </div>

            <label htmlFor='productImage' className='mt-3'>Product Image :</label>
            <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                    <span className='text-4xl'><FaCloudUploadAlt/></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                </div>
              </div>
              </label> 
              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div 
                                   key={index}
                                   className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>
        <div className="mb-4">
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Description :</label>
            <textarea
                id="Description"
                name="description"
                onChange={handleOnChange}
                value={data.description}
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter product description"
                rows="4"
            />
            
        </div>
        <label htmlFor="ProductStock" className="block text-sm font-medium text-gray-700">Stock :</label>
          <input
            type="number"
            id="ProductStock"
            name="stock"
            onChange={handleOnChange}
            value={data.stock}
            className="my-2 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter product stock"
          />
        
        <button
            onClick={handleSubmit}
          type="button"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>

       {/***display image full screen */}
       {
        openFullScreenImage && (
          <FullImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }


    </div>
  );
};

export default AdminViewProduct;