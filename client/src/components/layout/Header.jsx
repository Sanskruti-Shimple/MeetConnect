import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Container from "./Container";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Interviews", path: "/interviews" },
    { name: "Practice", path: "/practice" },
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="text-2xl font-black text-indigo-700 tracking-tighter flex items-center">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mr-2 text-xl font-bold">M</span>
            MeetConnect
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === link.path
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pl-4 ml-4 border-l border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-bold text-slate-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          </nav>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-slate-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </Container>
      
      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 absolute w-full shadow-lg">
          <Container>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                 <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                 >
                   {link.name}
                 </Link>
              ))}
              <hr className="my-2 border-slate-100" />
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 font-medium text-red-500 hover:bg-red-50 rounded-xl"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;