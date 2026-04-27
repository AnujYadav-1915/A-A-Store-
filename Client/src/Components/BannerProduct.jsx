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
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = React.useCallback(() => {
        setCurrentImage(prev => (prev + 1) % DeskTopImages.length);
    }, [DeskTopImages.length]);

    const prevImage = () => {
        setCurrentImage(prev => (prev - 1 + DeskTopImages.length) % DeskTopImages.length);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 6000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className='container mx-auto px-4 mt-6'>
            <div className='w-full relative h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden premium-shadow group'>
                
                {/* Navigation Arrows */}
                <div className='absolute z-10 inset-0 flex items-center justify-between px-6 pointer-events-none'>
                    <button 
                        onClick={prevImage} 
                        className='w-12 h-12 glass rounded-full flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-xl pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0'
                    >
                        <FaAngleLeft size={20} />
                    </button>
                    <button 
                        onClick={nextImage} 
                        className='w-12 h-12 glass rounded-full flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-xl pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0'
                    >
                        <FaAngleRight size={20} />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
                    {DeskTopImages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                        />
                    ))}
                </div>

                {/* Desktop Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden bg-slate-900'>
                    {DeskTopImages.map((imageURL, index) => (
                        <div
                            key={index}
                            className='w-full h-full min-w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]'
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} alt="Banner" className='w-full h-full object-cover' />
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className='flex md:hidden h-full w-full overflow-hidden bg-slate-900'>
                    {MobileImages.map((imageURL, index) => (
                        <div
                            key={index}
                            className='w-full h-full min-w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]'
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} alt="Banner" className='w-full h-full object-cover' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BannerProduct