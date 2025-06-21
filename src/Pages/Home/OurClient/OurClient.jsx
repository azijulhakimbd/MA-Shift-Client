import React from "react";
import Amazon from "../../../assets/brands/amazon.png";
import Amazon1 from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start from "../../../assets/brands/start.png";
import start1 from "../../../assets/brands/start-people 1.png";
import Marquee from "react-fast-marquee";

const brands = [Amazon, Amazon1, casio, moonstar, randstad, start, start1];

const OurClient = () => {
  return (
    <div className="py-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Our Clients</h2>
        <p className="text-gray-500">We've helped thousands of sales teams</p>
      </div>
      <Marquee pauseOnHover loop={0} speed={50} gradient={false}>
        {brands.map((brand, index) => (
          <div
            key={index}
            className="mx-10 flex items-center justify-center w-32  shadow transition-colors duration-300"
          >
            <img src={brand} alt={`brand-${index}`} className="h-6 object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OurClient;
