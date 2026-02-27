import { useSelector } from "react-redux";

const StatsCards = () => {
  const { interviews } = useSelector((state) => state.interviews);

  const total = interviews.length;
  const upcoming = interviews.filter(i => i.status === "upcoming").length;
  const completed = interviews.filter(i => i.status === "completed").length;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-6 rounded-xl shadow border border-borderColor">
        <h3 className="text-gray-500 text-sm">Total Interviews</h3>
        <p className="text-3xl font-bold mt-2">{total}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-borderColor">
        <h3 className="text-gray-500 text-sm">Upcoming</h3>
        <p className="text-3xl font-bold mt-2">{upcoming}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-borderColor">
        <h3 className="text-gray-500 text-sm">Completed</h3>
        <p className="text-3xl font-bold mt-2">{completed}</p>
      </div>
    </div>
  );
};

export default StatsCards;