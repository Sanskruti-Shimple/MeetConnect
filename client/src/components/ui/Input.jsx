const Input = ({ type, name, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      onChange={onChange}
    />
  );
};

export default Input;