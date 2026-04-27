import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/FetchCategoryWiseProduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(8).fill(null)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart();
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setLoading(false)
            setData(categoryProduct?.data || [])
        }
        fetchData();
    }, [category])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='max-w-7xl mx-auto px-4 my-16 relative group'>
        <div className='flex items-center justify-between mb-8'>
            <h2 className='text-2xl md:text-3xl font-black text-slate-900 tracking-tight'>{heading}</h2>
            <div className='hidden md:flex gap-2'>
                <button onClick={scrollLeft} className='w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all'>
                    <FaAngleLeft/>
                </button>
                <button onClick={scrollRight} className='w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all'>
                    <FaAngleRight/>
                </button>
            </div>
        </div>
                
        <div className='flex items-center gap-6 overflow-x-auto scrollbar-none transition-all scroll-smooth pb-8' ref={scrollElement}>
           {loading ? (
                loadingList.map((_,index)=>(
                    <div key={index} className='min-w-[280px] bg-white rounded-3xl premium-shadow overflow-hidden border border-slate-100 animate-pulse'>
                        <div className='bg-slate-100 h-48 w-full'></div>
                        <div className='p-6 space-y-3'>
                            <div className='h-4 bg-slate-100 rounded w-3/4'></div>
                            <div className='h-3 bg-slate-100 rounded w-1/2'></div>
                            <div className='h-8 bg-slate-100 rounded w-full mt-4'></div>
                        </div>
                    </div>
                ))
           ) : data.length > 0 ? (
            data.map((product,index)=>(
                <div key={index} className='min-w-[280px] bg-white rounded-3xl premium-shadow border border-white hover:border-blue-100 transition-all group/card flex flex-col'>
                    <Link to={`/product/${product?._id}`} className='h-48 bg-slate-50 flex items-center justify-center rounded-t-3xl overflow-hidden p-6 relative'>
                        <img src={product.productImage[0]} className='h-full object-contain group-hover/card:scale-110 transition-transform duration-500'/>
                        <div className='absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500'>
                            {product?.brandName}
                        </div>
                    </Link>
                    <div className='p-6 flex-1 flex flex-col justify-between'>
                        <div className='space-y-1 mb-4'>
                            <h2 className='font-bold text-slate-900 text-ellipsis line-clamp-2 group-hover/card:text-blue-600 transition-colors leading-tight'>{product?.productName}</h2>
                            <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>{product?.category}</p>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex items-baseline gap-2'>
                                <p className='text-xl font-black text-slate-900'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                <p className='text-xs text-slate-400 line-through'>{ displayINRCurrency(product?.price)  }</p>
                            </div>
                            <button 
                                className='w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl hover:bg-blue-600 transition-all uppercase tracking-widest premium-shadow'
                                onClick={(e)=>handleAddToCart(e,product?._id)}
                            >
                                Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            ))
           ) : (
            <p className='text-slate-400 text-sm'>Curating more premium choices...</p>
           )}
        </div>
    </div>
  )
}

export default VerticalCardProduct