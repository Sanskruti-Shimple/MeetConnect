import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import StatsCards from "../components/dashboard/StatsCards";
import ScheduleForm from "../components/forms/ScheduleForm";
import API from "../api/axios";
import { setInterviews } from "../features/interviews/interviewSlice";
import { FiTrendingUp, FiCalendar, FiAward } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await API.get("/interviews");
        dispatch(setInterviews(res.data));
      } catch (err) {
        console.error("Failed to load interviews", err);
      }
    };
    fetchInterviews();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow pt-10 pb-20">
        <Container>
          {/* Hero Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-10 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-indigo-100 opacity-50 transform rotate-12">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Welcome back, <span className="text-indigo-600">{user?.name?.split(' ')[0] || "User"}</span>! 👋
              </h1>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Ready to take your career to the next level? Track your upcoming interviews, monitor performance, and schedule specialized practice sessions to master your skills.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-100">
                  <FiTrendingUp className="mr-2" />
                  Analytics are up 12%
                </div>
                <div className="flex items-center text-sm px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg border border-emerald-100">
                  <FiAward className="mr-2" />
                  Skill score progressing
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <FiCalendar className="mr-3 text-indigo-500"/> Performance Dashboard
            </h2>
            <StatsCards />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Action Area */}
            <div className="lg:col-span-2">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full">
                 <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity Highlights</h3>
                 
                 <div className="space-y-6">
                    {/* Placeholder for activity while API fetches / builds */}
                    <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <FiCalendar className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-slate-800">New interview scheduled</h4>
                        <p className="text-sm text-slate-500 mt-1">Keep an eye on your calendar. Make sure to prepare!</p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <FiAward className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-slate-800">Achieved 95% on Behavioral Mock</h4>
                        <p className="text-sm text-slate-500 mt-1">Outstanding performance in STAR method responses.</p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Side Action panel */}
            <div className="lg:col-span-1">
              <ScheduleForm />
            </div>
          </div>

        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;