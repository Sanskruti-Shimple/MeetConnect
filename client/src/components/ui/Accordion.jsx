import { useState } from "react";

const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-borderColor rounded-lg mb-4">
      <div
        className="p-4 cursor-pointer font-medium flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span>{open ? "-" : "+"}</span>
      </div>

      {open && (
        <div className="p-4 text-gray-600 border-t border-borderColor">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Accordion;