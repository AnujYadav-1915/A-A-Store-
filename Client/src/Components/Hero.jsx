import { Link } from "react-router-dom";
import BannerProduct from "./BannerProduct";

export default function Hero() {
  return (
    <>
      <div className=" w-full h-[35vh] md:h-[50vh] overflow-hidden">
        
        <div className=" inset-0">
          <BannerProduct />
        </div>
      </div>
    </>
  );
}
