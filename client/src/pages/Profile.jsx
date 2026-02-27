import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import API from "../api/axios";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiCalendar, FiShield, FiEdit3, FiAward } from "react-icons/fi";

const Profile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        dispatch(updateProfile(res.data));
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          contact: res.data.contact || "",
          dob: res.data.dob ? res.data.dob.split("T")[0] : "",
        });
      } catch (error) {
        toast.error("Failed to fetch latest profile data");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    
    fetchProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      const res = await API.put("/profile", formData);
      dispatch(updateProfile(res.data));
      toast.success("Profile Updated Successfully! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-12">
        <Container>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Avatar & Summary */}
            <div className="lg:col-span-1">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  
                  <div className="relative mt-12 mb-6">
                    <div className="w-32 h-32 bg-white rounded-full p-2 mx-auto shadow-xl relative backdrop-blur-sm">
                       <div className="w-full h-full bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 text-5xl font-black uppercase">
                         {formData.name ? formData.name.charAt(0) : "U"}
                       </div>
                       <button className="absolute bottom-1 right-1 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-700 transition">
                         <FiEdit3 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    {formData.name || "User Profile"}
                  </h2>
                  <p className="text-indigo-600 font-semibold text-sm tracking-wide mt-1 uppercase">
                    Software Engineer
                  </p>
                  
                  <div className="mt-8 border-t border-slate-100 pt-8 space-y-4 text-left">
                    <div className="flex items-center text-slate-600">
                      <FiMail className="w-5 h-5 mr-3 text-slate-400" />
                      <span className="truncate">{formData.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <FiPhone className="w-5 h-5 mr-3 text-slate-400" />
                      <span>{formData.contact || "No contact provided"}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                       <FiAward className="w-5 h-5 mr-3 text-slate-400" />
                       <span>Pro Member Tracker</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Settings Form */}
            <div className="lg:col-span-2">
               <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Account Settings</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage your personal information and preferences.</p>
                     </div>
                     <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
                        <FiShield className="w-6 h-6" />
                     </div>
                  </div>

                  {fetching ? (
                     <div className="p-16 flex justify-center items-center">
                        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                         
                         {/* Full Name */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiUser className="text-slate-400 w-5 h-5" />
                              </div>
                              <input
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe"
                                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-slate-700 font-medium placeholder-slate-400"
                                value={formData.name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                         </div>

                         {/* Email Address */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiMail className="text-slate-400 w-5 h-5" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-slate-700 font-medium placeholder-slate-400"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                         </div>

                         {/* Phone Number */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Contact Number</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiPhone className="text-slate-400 w-5 h-5" />
                              </div>
                              <input
                                type="text"
                                name="contact"
                                placeholder="+1 (555) 000-0000"
                                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-slate-700 font-medium placeholder-slate-400"
                                value={formData.contact}
                                onChange={handleChange}
                              />
                            </div>
                         </div>

                         {/* Date of Birth */}
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Date of Birth</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiCalendar className="text-slate-400 w-5 h-5" />
                              </div>
                              <input
                                type="date"
                                name="dob"
                                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-slate-700 font-medium"
                                value={formData.dob}
                                onChange={handleChange}
                              />
                            </div>
                         </div>

                      </div>

                      <div className="pt-6 border-t border-slate-100 flex justify-end">
                         <button
                           type="submit"
                           disabled={loading}
                           className="bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transform transition-all flex items-center"
                         >
                           {loading ? (
                             <>
                               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                               Saving...
                             </>
                           ) : (
                             "Save Profile Changes"
                           )}
                         </button>
                      </div>
                    </form>
                  )}
               </div>
            </div>

          </div>

        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;