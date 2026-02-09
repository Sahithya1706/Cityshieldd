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

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="streetlight-page">
          <StreetLightForm onAdd={addFault} />
          <StreetLightList
            faults={faults}
            onResolve={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default StreetLight;
