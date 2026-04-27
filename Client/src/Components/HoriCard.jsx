import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/FetchCategoryWiseProduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {
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
    <div className='max-w-7xl mx-auto px-4 my-12 relative group'>
        <div className='flex items-center justify-between mb-6'>
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
                
        <div className='flex items-center gap-6 overflow-x-auto scrollbar-none transition-all scroll-smooth pb-4' ref={scrollElement}>
           {loading ? (
                loadingList.map((_,index)=>(
                    <div key={index} className='min-w-[320px] h-40 bg-white rounded-3xl premium-shadow flex border border-slate-100 animate-pulse'>
                        <div className='bg-slate-100 h-full w-32 rounded-l-3xl'></div>
                        <div className='p-6 flex-1 space-y-3'>
                            <div className='h-4 bg-slate-100 rounded w-3/4'></div>
                            <div className='h-3 bg-slate-100 rounded w-1/2'></div>
                            <div className='h-6 bg-slate-100 rounded w-1/3'></div>
                        </div>
                    </div>
                ))
           ) : data.length > 0 ? (
            data.map((product,index)=>(
                <div key={index} className='min-w-[320px] h-40 bg-white rounded-3xl premium-shadow flex border border-white hover:border-blue-100 transition-all group/card'>
                    <Link to={"/product/"+product?._id} className='w-32 h-full bg-slate-50 flex items-center justify-center rounded-l-3xl overflow-hidden p-4 flex-shrink-0'>
                        <img src={product.productImage[0]} className='h-full object-contain group-hover/card:scale-110 transition-transform duration-500'/>
                    </Link>
                    <div className='p-5 flex-1 flex flex-col justify-between overflow-hidden'>
                        <div className='space-y-1'>
                            <h2 className='font-bold text-slate-900 text-ellipsis line-clamp-1 group-hover/card:text-blue-600 transition-colors'>{product?.productName}</h2>
                            <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>{product?.category}</p>
                        </div>
                        <div className='flex flex-wrap items-end justify-between gap-2'>
                            <div>
                                <p className='text-lg font-black text-slate-900'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                <p className='text-xs text-slate-400 line-through'>{ displayINRCurrency(product?.price)  }</p>
                            </div>
                            <button 
                                className='px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-blue-600 transition-colors uppercase'
                                onClick={(e)=>handleAddToCart(e,product?._id)}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ))
           ) : (
            <p className='text-slate-400 text-sm'>Discovering new varieties...</p>
           )}
        </div>
    </div>
  )
}

export default HorizontalCardProduct
