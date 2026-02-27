import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markCompleted, setInterviews } from "../features/interviews/interviewSlice";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import API from "../api/axios";
import toast from "react-hot-toast";
import { FiCheckCircle, FiClock, FiCalendar, FiUser, FiAward, FiMessageSquare } from "react-icons/fi";

const MyInterviews = () => {
  const dispatch = useDispatch();
  const { interviews } = useSelector((state) => state.interviews);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await API.get("/interviews");
        dispatch(setInterviews(res.data));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch interviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [dispatch]);

  const filtered =
    filter === "all"
      ? interviews
      : interviews.filter((i) => i.status.toLowerCase() === filter);

  const handleComplete = async (id) => {
    const score = window.prompt("Enter Score (0-100)");
    const feedback = window.prompt("Enter Feedback");

    if (!score || !feedback) {
      toast.error("Score and Feedback are required");
      return;
    }

    try {
      await API.put(`/interviews/${id}`, {
        status: "completed",
        score: Number(score),
        feedback,
      });

      dispatch(
        markCompleted({
          id,
          score: Number(score),
          feedback,
        })
      );
      toast.success("Interview completed! 🎉");
    } catch (err) {
      toast.error("Failed to update interview.");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow py-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                My Interviews
              </h2>
              <p className="text-slate-500 mt-2 text-lg">Track and manage your upcoming and completed sessions.</p>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 text-slate-700 font-medium py-3 px-5 pr-12 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Sessions</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-48">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
             </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <FiCalendar className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No interviews found</h3>
              <p className="text-slate-500 mb-6 max-w-sm mx-auto">You haven't scheduled any interviews matching this filter yet. Go to your dashboard to schedule one!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 lg:gap-8 gap-6">
              {filtered.map((interview) => (
                <div
                  key={interview._id || interview.id}
                  className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-200/50 border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* Status strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${interview.status.toLowerCase() === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1 flex items-center">
                        {interview.type}
                      </h3>
                      <div className="flex items-center text-slate-500 mt-2">
                        <FiUser className="mr-2" />
                        <span className="font-medium mr-4">{interview.interviewer}</span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 text-sm font-bold rounded-full capitalize flex items-center shadow-sm ${
                        interview.status.toLowerCase() === "upcoming"
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {interview.status.toLowerCase() === "upcoming" ? <FiClock className="mr-1.5" /> : <FiCheckCircle className="mr-1.5" />}
                      {interview.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex items-center">
                     <FiCalendar className="text-indigo-500 mr-3 w-5 h-5 flex-shrink-0" />
                     <span className="text-slate-700 font-medium">{formatDate(interview.date)}</span>
                  </div>

                  {interview.status.toLowerCase() === "completed" && (
                    <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50">
                      <div className="flex items-center mb-3">
                         <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                            <FiAward className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider">Final Score</p>
                            <p className="text-xl font-bold text-slate-800">{interview.score}<span className="text-slate-500 text-sm font-normal">/100</span></p>
                         </div>
                      </div>
                      
                      {interview.feedback && (
                        <div className="mt-4 pt-4 border-t border-emerald-100/50">
                          <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center">
                            <FiMessageSquare className="mr-2" />
                            Feedback
                          </p>
                          <p className="text-slate-700 leading-relaxed italic border-l-2 border-emerald-300 pl-3">"{interview.feedback}"</p>
                        </div>
                      )}
                    </div>
                  )}

                  {interview.status.toLowerCase() === "upcoming" && (
                    <div className="mt-2 text-right">
                      <button
                        onClick={() => handleComplete(interview._id || interview.id)}
                        className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg focus:ring-4 focus:ring-indigo-100 transition-all flex items-center inline-flex group"
                      >
                        <FiCheckCircle className="mr-2 group-hover:scale-110 transition-transform" />
                        Mark Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default MyInterviews;