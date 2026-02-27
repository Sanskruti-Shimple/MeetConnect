import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInterview } from "../../features/interviews/interviewSlice";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { FiClock, FiUser, FiBriefcase } from "react-icons/fi";

const ScheduleForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    date: "",
    interviewer: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.type || !formData.date || !formData.interviewer) {
      toast.error("Please fill out all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/interviews", {
        ...formData,
        status: "upcoming"
      });
      dispatch(addInterview(res.data));
      toast.success("Interview Successfully Scheduled! 🎉");
      setFormData({ type: "", date: "", interviewer: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          New Interview
        </h2>
        <p className="text-slate-500 text-sm mt-1">Book a session to practice your skills.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow justify-between">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiBriefcase className="text-slate-400" />
            </div>
            <select
              className="w-full pl-12 pr-4 py-3.5 border-none bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 font-medium appearance-none"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="" disabled>Select Discipline</option>
              <option value="Frontend">Frontend Engineering</option>
              <option value="Backend">Backend Engineering</option>
              <option value="Full Stack">Full Stack</option>
              <option value="DSA">Data Structures & Algorithms</option>
              <option value="Behavioral">Behavioral & Soft Skills</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiClock className="text-slate-400" />
            </div>
            <input
              type="datetime-local"
              className="w-full pl-12 pr-4 py-3.5 border-none bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 font-medium"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Interviewer Name"
              className="w-full pl-12 pr-4 py-3.5 border-none bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700 font-medium placeholder-slate-400"
              value={formData.interviewer}
              onChange={(e) =>
                setFormData({ ...formData, interviewer: e.target.value })
              }
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transform transition-all active:scale-[0.98]"
        >
           {loading ? "Scheduling..." : "Lock in schedule"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleForm;