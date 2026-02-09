import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HousingForm from "../components/HousingForm";
import HousingList from "../components/HousingList";
import API from "../utils/api";

const HousingComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  // FETCH ALL
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/housing");
      setComplaints(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ADD COMPLAINT
  const addComplaint = async (data) => {
    try {
      await API.post("/housing", {
        flat: data.flat,
        issue: data.issue,
        description: data.desc,
      });
      fetchComplaints();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/housing/${id}/status`, { status });
      fetchComplaints();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // DELETE ALL
  const deleteAllComplaints = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL housing complaints?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete("/housing");
      fetchComplaints();
    } catch (err) {
      console.error("Delete all error:", err);
      alert("Failed to delete housing complaints");
    }
  };

  return (
    <>
      <Navbar />

      {/* FULL SCREEN HOUSING PAGE */}
      <div className="housing-full">
        <div className="housing-header">
          <h2>Housing Complaints Management</h2>
          <p>Raise, track, and resolve housing-related complaints</p>

          <div className="housing-actions">
            <button className="danger-btn" onClick={deleteAllComplaints}>
              🗑️ Delete All Complaints
            </button>
          </div>
        </div>

        <div className="housing-layout">
          <HousingForm onAdd={addComplaint} />
          <HousingList
            items={complaints}
            onUpdate={updateStatus}
          />
        </div>
      </div>
    </>
  );
};

export default HousingComplaints;
