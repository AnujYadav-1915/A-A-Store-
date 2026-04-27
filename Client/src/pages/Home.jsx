import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import Header from '../Components/Header';
import ProductsByCategory from "../Components/ProductsByCategory";
import HorizontalCardProduct from "../Components/HoriCard";
import VerticalCardProduct from "../Components/VertiCard";


export default function Home() {
  return (
    <div className="bg-[#F9FAFB] text-[#111111]">
      <Header />
      <ProductsByCategory />
      <Hero />
      
      <div className="space-y-16 pb-20">
        <HorizontalCardProduct category={"earphones"} heading={"Elite Audio Experience"} />
        <HorizontalCardProduct category={"watches"} heading={"Timeless Luxury Timepieces"} />

        <VerticalCardProduct category={"mobiles"} heading={"Flagship Smartphones"}/>
        <VerticalCardProduct category={"mouse"} heading={"Precision Productivity Tools"}/>
        <VerticalCardProduct category={"televisions"} heading={"Cinematic Visual Experience"}/>
        <VerticalCardProduct category={"camera"} heading={"Professional Photography"}/>
        <VerticalCardProduct category={"earphones"} heading={"Wired High-Fidelity Audio"}/>
        <VerticalCardProduct category={"speakers"} heading={"Immersive Sound Systems"}/>
        <VerticalCardProduct category={"refrigerator"} heading={"Smart Kitchen Appliances"}/>
        <VerticalCardProduct category={"trimmers"} heading={"Precision Grooming"}/>
      </div>
      <Footer />
    </div>
  );
}
