import React from "react";
import merchantTrack from '../../../assets/location-merchant.png'
const Merchant = () => {
  return (
    <div data-aos="fade-down-right" className="bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat bg-size-[10] w-11/12 mx-auto rounded-2xl border p-20 bg-[#03373D] py-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={merchantTrack}
          className="max-w-sm"
        />
        <div>
          <h1 className="text-3xl font-bold text-amber-50">Merchant and Customer Satisfaction <br /> is Our First Priority</h1>
          <p className="py-6 text-amber-50">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn bg-base-100 rounded-full mx-2">Become a Merchant</button>
          <button className="btn text-base-100 btn-outline rounded-full">Earn with MA Shift Courier</button>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
