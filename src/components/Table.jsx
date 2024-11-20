import { useState, useEffect } from "react";
import "../tableApp.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import EnglishPage from "./khamidEnglishPage";
import KhamidFiltersDiv from "./khamidFiltersDiv";

// fklajsdflkasdf

function Table() {
  const [studentsFrontend, setStudentsFrontend] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredStudents, setFilteredStudents] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get(
          "https://aura-production-24d6.up.railway.app/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response || !response.data)
          throw new Error("Null pointer reference");

        setStudentsFrontend(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching student data.");
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [navigate]);

  const queryParams = new URLSearchParams(location.search);
  const selectedLevel = queryParams.get("level");

  // Filter students based on level and search query
  useEffect(() => {
    let filtered = studentsFrontend;

    if (selectedLevel) {
      filtered = filtered.filter(
        (student) => student.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
      );
    }

    setFilteredStudents(filtered);
  }, [studentsFrontend, selectedLevel, searchQuery]);

  const updatePaymentStatus = (id, value) => {
    return studentsFrontend.map((item) =>
      item.id == id ? { ...item, payment_status: value } : item
    );
  };

  const handlePaymentChange = async (id, value) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.patch(
        `https://aura-production-24d6.up.railway.app/students/${id}`,
        { payment_status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("Success");
      } else {
        console.log("Error");
      }
      setStudentsFrontend(updatePaymentStatus(id, value));
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const updateComment = (id, newComment) => {
    return studentsFrontend.map((item) =>
      item.id === id ? { ...item, comment: newComment } : item
    );
  };

  const handleCommentChange = async (id, newComment) => {
    if (newComment !== editingComment) {
      const token = localStorage.getItem("access_token");
      try {
        if (!token) {
          navigate("/login");
        }
        const response = await axios.patch(
          `https://aura-production-24d6.up.railway.app/students/comment/${id}`,
          { comment: newComment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 204) {
          toast.success("Success");
        } else {
          console.log("Error");
        }
        setStudentsFrontend(updateComment(id, newComment));
      } catch (error) {
        console.error("Error updating comment:", error);
      }
      setEditingComment(null); // Reset initial comment tracking
    }
  };

  return (
    <div className="flex w-full">
      <EnglishPage />
      <div className="w-full mx-auto p-2">
        <div className=" flex overflow-x-auto bg-white shadow-md rounded-lg mb-2">
          <div className=" w-5/6 rounded-lg border-1">
            <KhamidFiltersDiv />
          </div>
          <div className="w-1/6 ">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              className="text-center w-full h-full  border rounded-lg  focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>
        </div>

        <div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="w-1/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="w-3/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="w-2/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="w-3/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="w-1/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="w-1/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="w-1/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="w-2/12 p-4 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Teacher
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredStudents.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="p-4 text-sm font-medium text-gray-700">
                      {row.id}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {row.full_name}
                    </td>
                    <td className="p-4">
                      <select
                        value={row.payment_status}
                        onChange={(e) =>
                          handlePaymentChange(row.id, e.target.value)
                        }
                        className={`appearance-none w-28 p-1 border text-sm border-gray-300 bg-white text-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center ${
                          row.payment_status === "Full Paid"
                            ? "custom-green-bg"
                            : row.payment_status === "Not Full"
                            ? "custom-blue-bg"
                            : "custom-red-bg"
                        }`}
                      >
                        <option
                          value="Full Paid"
                          className="text-green-800 bg-green-100"
                        >
                          Full Paid
                        </option>
                        <option
                          value="Not Paid"
                          className="text-red-800 bg-red-100"
                        >
                          Not Paid
                        </option>
                        <option
                          value="Not Full"
                          className="text-blue-600 bg-blue-100"
                        >
                          Not Full
                        </option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <input
                        value={row.comment || ""}
                        onFocus={() => setEditingComment(row.comment)} // Store initial comment on focus
                        onChange={(e) =>
                          setStudentsFrontend(
                            updateComment(row.id, e.target.value)
                          )
                        }
                        onBlur={(e) =>
                          handleCommentChange(row.id, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-transparent"
                        rows="1"
                      />
                    </td>
                    <td className="p-4 text-sm text-gray-600">{row.time}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {row.level.toUpperCase()}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {row.day === 1 ? "Monday" : "Tuesday"}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {row.teacher_first_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
