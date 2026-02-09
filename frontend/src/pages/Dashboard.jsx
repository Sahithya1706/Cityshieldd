import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [streetLights, setStreetLights] = useState([]);
  const [waste, setWaste] = useState([]);
  const [housing, setHousing] = useState([]);
  const [generalIssues, setGeneralIssues] = useState([]);

  const fetchAllData = async () => {
    try {
      const [
        alertsRes,
        streetRes,
        wasteRes,
        housingRes,
        generalRes
      ] = await Promise.all([
        API.get("/alerts"),
        API.get("/street-lights"),
        API.get("/waste"),
        API.get("/housing"),
        API.get("/general-issues"),
      ]);

      setAlerts(alertsRes.data);
      setStreetLights(streetRes.data);
      setWaste(wasteRes.data);
      setHousing(housingRes.data);
      setGeneralIssues(generalRes.data);

    } catch (err) {
      console.error("Dashboard fetch error", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ===== STATS =====
  const totalIssues =
    alerts.length +
    streetLights.length +
    waste.length +
    housing.length +
    generalIssues.length;

  const activeAlerts = alerts.filter(a => a.status === "open").length;
  const resolvedAlerts = alerts.filter(a => a.status === "resolved").length;

  const pendingLights = streetLights.filter(l => l.status === "pending").length;
  const fixedLights = streetLights.filter(l => l.status === "fixed").length;

  const pendingWaste = waste.filter(w => w.status !== "done").length;

  const openHousing = housing.filter(h => h.status !== "Resolved").length;

  const openGeneral = generalIssues.filter(g => g.status === "Open").length;

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="dashboard">
          <div className="dashboard-header">
            <h2>City Dashboard</h2>
            <p>Overall city issue overview</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Issues</h3>
              <p className="stat-number">{totalIssues}</p>
            </div>

            <div className="stat-card active">
              <h3>Active Alerts</h3>
              <p className="stat-number">{activeAlerts}</p>
            </div>

            <div className="stat-card resolved">
              <h3>Resolved Alerts</h3>
              <p className="stat-number">{resolvedAlerts}</p>
            </div>

            <div className="stat-card">
              <h3>Street Lights Pending</h3>
              <p className="stat-number">{pendingLights}</p>
            </div>

            <div className="stat-card">
              <h3>Waste Requests Pending</h3>
              <p className="stat-number">{pendingWaste}</p>
            </div>

            <div className="stat-card">
              <h3>Other Issues Open</h3>
              <p className="stat-number">{openGeneral}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
