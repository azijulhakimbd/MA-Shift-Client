import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    comment:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    title: "CTO",
    comment:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    title: "CEO",
    comment:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current - 1 + reviews.length) % reviews.length);
  };

  const next = () => {
    setCurrent((current + 1) % reviews.length);
  };

  return (
    <div data-aos="fade-left" className="py-16 bg-gray-50 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2247/2247670.png"
          alt="posture-icon"
          className="w-16 mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What our customers are saying
        </h2>
        <p className="text-gray-500 mb-8">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div className="flex justify-center items-center gap-6 overflow-hidden">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 w-80 p-6 rounded-xl shadow-md bg-white ${
                idx === current
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-30 scale-90 z-0"
              }`}
            >
              <FaQuoteLeft className="text-2xl text-cyan-600 mb-3" />
              <p className="text-gray-700 text-sm mb-4">{review.comment}</p>
              <div className="border-t pt-3">
                <h4 className="font-bold text-cyan-900">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-cyan-100"
          >
            <FaArrowLeft />
          </button>
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-cyan-600" : "bg-gray-300"
              }`}
            />
          ))}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border flex items-center justify-center bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
