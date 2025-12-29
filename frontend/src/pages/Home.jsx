import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/create`,
        { title, paragraph },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setParagraph("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#192d51] p-6">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-white mb-2">To-Do Dashboard</h1>
      <p className="text-blue-200 mb-8">Create, manage, and track your notes</p>

      <div className="max-w-2xl bg-[#22375e] border border-blue-900 shadow-xl rounded-2xl p-8 mx-auto">

        {/* Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/Show")}
            className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg"
          >
            Show To-Dos
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-blue-200 mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1b2b4a] text-white border border-blue-800
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Paragraph */}
          <div>
            <label className="block text-blue-200 mb-1 font-medium">Paragraph</label>
            <textarea
              value={paragraph}
              placeholder="Write details..."
              onChange={(e) => setParagraph(e.target.value)}
              className="w-full p-3 h-28 rounded-xl bg-[#1b2b4a] text-white border border-blue-800
                         resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-teal-600 rounded-xl shadow-lg 
                       hover:bg-teal-700 transition-all"
          >
            Add To-Do
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
