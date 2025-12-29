import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Show = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/todo/show`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Ensure completed flag exists
        const updated = response.data.data.map((t) => ({
          ...t,
          completed: t.completed || false,
        }));

        setTodos(updated);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, [navigate]);

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/todo/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // CHECKBOX COMPLETE
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // GROUP TODOS BY DATE
  const grouped = todos.reduce((acc, todo) => {
    const date = new Date(todo.createdAt).toLocaleDateString("en-GB");
    if (!acc[date]) acc[date] = [];
    acc[date].push(todo);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#162237] py-10 px-4">
      
      <h1 className="text-center text-white text-3xl font-semibold mb-8">
        Your Todos
      </h1>

      {todos.length === 0 ? (
        <p className="text-white text-center">No todo available</p>
      ) : (
        Object.keys(grouped).map((date) => (
          <div key={date} className="mb-10">
            
            {/* DATE HEADING */}
            <h2 className="text-white text-2xl font-bold mb-4">
              {date}
            </h2>

            <div className="flex flex-col gap-4">
              {grouped[date].map((item) => (
                <div
                  key={item._id}
                  className="bg-[#2f3f5f] text-white p-5 rounded-xl shadow-lg border border-gray-700"
                >
                  <div className="flex gap-3">

                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item._id)}
                      className="w-5 h-5 cursor-pointer mt-1"
                    />

                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          item.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`mt-2 text-gray-300 ${
                          item.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {item.paragraph}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => navigate(`/update/${item._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default Show;
