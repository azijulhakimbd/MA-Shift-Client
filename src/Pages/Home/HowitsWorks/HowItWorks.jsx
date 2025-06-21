import React from "react";
import { FaTruckPickup } from "react-icons/fa";
const steps = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup className="text-3xl text-primary" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup className="text-3xl text-primary" />,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup className="text-3xl text-primary" />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup className="text-3xl text-primary" />,
  },
];
const HowItWorks = () => {
  return (
    <div data-aos="zoom-in"
      className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-2">
        How it Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6  text-center"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="font-semibold text-md text-neutral">{step.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
