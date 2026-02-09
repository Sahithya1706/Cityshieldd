import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StreetLightForm from "../components/StreetLightForm";
import StreetLightList from "../components/StreetLightList";
import API from "../utils/api";

const StreetLight = () => {
  const [faults, setFaults] = useState([]);

  // FETCH ALL FAULTS
  const fetchFaults = async () => {
    try {
      const res = await API.get("/street-lights");
      setFaults(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFaults();
  }, []);

  // ADD NEW FAULT
  const addFault = async (data) => {
    try {
      await API.post("/street-lights", {
        location: data.location,
        issue: data.issue,
        description: data.desc,
      });
      fetchFaults();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // FIX / REOPEN
  const updateStatus = async (id, status) => {
    try {
      if (status === "pending") {
        await API.put(`/street-lights/${id}/fix`);
      } else {
        await API.put(`/street-lights/${id}/reopen`);
      }
      fetchFaults();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // DELETE ALL
  const deleteAllFaults = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL street light reports?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete("/street-lights");
      fetchFaults();
    } catch (err) {
      console.error("Delete all error:", err);
      alert("Failed to delete street light reports");
    }
  };

  return (
    <>
      <Navbar />

      {/* FULL SCREEN STREET LIGHT PAGE */}
      <div className="streetlight-full">
        <div className="streetlight-header">
          <h2>Street Light Management</h2>
          <p>Report, track, and resolve street light issues</p>

          <div className="streetlight-actions">
            <button className="danger-btn" onClick={deleteAllFaults}>
              🗑️ Delete All Reports
            </button>
          </div>
        </div>

        <div className="streetlight-layout">
          <StreetLightForm onAdd={addFault} />
          <StreetLightList
            faults={faults}
            onResolve={updateStatus}
          />
        </div>
      </div>
    </>
  );
};

export default StreetLight;
