import React, { useEffect, useState } from 'react'
import L1 from "../assets/Banner/L1.jpg"
import L2 from "../assets/Banner/L2.jpg"
import L3 from "../assets/Banner/L3.jpg"
import L4 from "../assets/Banner/L4.jpg"
import L5 from "../assets/Banner/L5.jpg"
import L6 from "../assets/Banner/L6.jpg"
import M1 from "../assets/Banner/M1.jpg"
import M2 from "../assets/Banner/M2.jpg"
import M3 from "../assets/Banner/M3.jpeg"    
import M4 from "../assets/Banner/M4.jpg"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'


function BannerProduct() {
    const DeskTopImages = [L1, L2, L3, L4, L5, L6];
    const MobileImages = [M1, M2, M3, M4];
    const [currentImage,setCurrentImage] = useState(0)

const nextImage = React.useCallback(() => {
        if (DeskTopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1);
        }
    }, [DeskTopImages.length, currentImage]);

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(DeskTopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[
        currentImage,
        DeskTopImages.length,
        nextImage
    ])

  return (
<div className='container mx-auto px-4 rounded'>
  <div className='w-full relative h-[35vh] md:h-[50vh]'>  {/* ✅ Responsive height */}

    {/* Navigation Arrows */}
    <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
      <div className='flex justify-between w-full text-2xl px-4'>
        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'>
          <FaAngleLeft />
        </button>
        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
          <FaAngleRight />
        </button>
      </div>
    </div>

    {/* Desktop & Tablet Version */}
    <div className='hidden md:flex h-full w-full overflow-hidden'>
      {DeskTopImages.map((imageURL, index) => (
        <div
          key={index}
          className='w-full h-full min-w-full transition-all duration-300  ease-in-out'
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          <img src={imageURL} alt="" className='w-full h-full object-fit' />
        </div>
      ))}
    </div>

    {/* Mobile Version */}
    <div className='flex md:hidden h-full w-full overflow-hidden'>
      {MobileImages.map((imageURL, index) => (
        <div
          key={index}
          className='w-full h-full min-w-full transition-all duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          <img src={imageURL} alt="" className='w-full h-full object-cover' />
        </div>
      ))}
    </div>

  </div>
</div>

  )
}

export default BannerProduct