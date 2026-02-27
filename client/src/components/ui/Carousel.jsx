import { useState } from "react";

const testimonials = [
  "MeetConnect helped me land my first job!",
  "The mock interviews improved my confidence.",
  "Clean and structured interview preparation platform.",
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow border border-borderColor text-center max-w-2xl mx-auto">
      <p className="text-gray-600 mb-6 text-lg">
        "{testimonials[index]}"
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={prev}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Prev
        </button>

        <button
          onClick={next}
          className="px-4 py-2 bg-accent text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;