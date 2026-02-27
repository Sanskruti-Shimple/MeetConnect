import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSuccess } from "../../features/auth/authSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    dispatch(
      loginSuccess({
        user: { email: formData.email },
        token: "dummy-token",
      })
    );

    toast.success("Login Successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 border border-borderColor">
        <h2 className="text-3xl font-bold mb-6 text-center text-brand">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button type="submit" text="Login" />
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-accent font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;