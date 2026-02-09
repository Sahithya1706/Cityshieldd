import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HousingForm from "../components/HousingForm";
import HousingList from "../components/HousingList";
import API from "../utils/api";

const HousingComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await API.get("/housing");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const addComplaint = async (data) => {
    await API.post("/housing", {
      flat: data.flat,
      issue: data.issue,
      description: data.desc,
    });
    fetchComplaints();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/housing/${id}/status`, { status });
    fetchComplaints();
  };

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="housing-page">
          <HousingForm onAdd={addComplaint} />
          <HousingList
            items={complaints}
            onUpdate={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default HousingComplaints;
