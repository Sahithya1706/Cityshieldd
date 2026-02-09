import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WasteForm from "../components/WasteForm";
import WasteList from "../components/WasteList";
import API from "../utils/api";

const WasteCollection = () => {
  const [items, setItems] = useState([]);

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

  // UPDATED: Now accepts the FormData object directly
  const addWaste = async (formData) => {
    try {
      // You don't need to wrap this in { } because formData already contains 
      // the location, type, description, and the image file.
      await API.post("/waste", formData);
      fetchWaste();
    } catch (err) {
      console.error("Error adding waste report:", err);
      alert("Submission failed. Check your connection.");
    }
  };

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

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />
        <div className="waste-page">
          <WasteForm onAdd={addWaste} />
          <WasteList items={items} onResolve={updateStatus} />
        </div>
      </div>
    </div>
  );
};

export default WasteCollection;
