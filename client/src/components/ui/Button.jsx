const Button = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md"
    >
      {text}
    </button>
  );
};

export default Button;