import React from "react";
import liveTracking from "../../../assets/live-tracking.png";
import saveDelivery from "../../../assets/safe-delivery.png";
import callCenter from "../../../assets/call-center-service.png";

const cards = [
  {
    icon: liveTracking,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    bgColor: "bg-rose-100",
  },
  {
    icon: saveDelivery,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    bgColor: "bg-green-100",
  },
  {
    icon: callCenter,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    bgColor: "bg-blue-100",
  },
];

const InfoCard = () => {
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div data-aos="flip-down" className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-4 p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition duration-300"
          >
            <div
              className={`p-4 rounded-xl ${card.bgColor} flex-shrink-0 w-full sm:w-60 h-40 flex items-center justify-center`}
            >
              <img
                src={card.icon}
                alt={card.title}
                className="h-full object-contain"
              />
            </div>

            {/* Divider only visible on large screens */}
            <div className="hidden lg:block">
              <div className="divider lg:divider-horizontal border-dashed border-r-4 border-[#03464D] h-full"></div>
            </div>

            <div className="lg:py-4 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCard;
