import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaArrowRight } from "react-icons/fa";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, it’s designed to fit a wide range of body sizes and is adjustable for kids, adults, and seniors.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Absolutely. Regular use promotes spinal alignment and relieves muscular tension, helping reduce back pain over time.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Yes, some models include vibration alerts to notify you when you’re slouching or need to correct your posture.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can subscribe to restock alerts using your email on the product page. We’ll notify you immediately once it’s available.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <div data-aos="fade-down-right" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-500 mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div className="space-y-3 text-left">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border rounded-md transition-all duration-300 ${
                openIndex === index
                  ? "bg-cyan-100 border-cyan-300"
                  : "bg-white border-gray-300"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-gray-800"
              >
                {item.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 text-sm">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold rounded-full shadow-md transition">
            See More FAQ’s <FaArrowRight className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
