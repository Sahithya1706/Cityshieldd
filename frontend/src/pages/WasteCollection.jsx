import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WasteForm from "../components/WasteForm";
import WasteList from "../components/WasteList";
import API from "../utils/api";

const WasteCollection = () => {
  const [items, setItems] = useState([]);

  // FETCH ALL
  const fetchWaste = async () => {
    try {
      const res = await API.get("/waste");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching waste data:", err);
    }
  };

  useEffect(() => {
    fetchWaste();
  }, []);

  // ADD NEW (WITH IMAGE)
  const addWaste = async (formData) => {
    try {
      await API.post("/waste", formData);
      fetchWaste();
    } catch (err) {
      console.error("Error adding waste report:", err);
      alert("Submission failed");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      if (status === "scheduled") {
        await API.put(`/waste/${id}/done`);
      } else {
        await API.put(`/waste/${id}/reopen`);
      }
      fetchWaste();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // DELETE ALL
  const deleteAllWaste = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL waste collection requests?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete("/waste");
      fetchWaste();
    } catch (err) {
      console.error("Delete all error:", err);
      alert("Failed to delete waste requests");
    }
  };

  return (
    <>
      <Navbar />

      {/* FULL SCREEN WASTE PAGE */}
      <div className="waste-full">
        <div className="waste-header">
          <h2>Waste Collection Management</h2>
          <p>Request, track, and manage waste collection with image evidence</p>

          <div className="waste-actions">
            <button className="danger-btn" onClick={deleteAllWaste}>
              🗑️ Delete All Requests
            </button>
          </div>
        </div>

        <div className="waste-layout">
          <WasteForm onAdd={addWaste} />
          <WasteList items={items} onResolve={updateStatus} />
        </div>
      </div>
    </>
  );
};

export default WasteCollection;
