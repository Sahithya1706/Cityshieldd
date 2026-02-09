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
        generalRes,
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

  // ===== COUNTS =====
  const totalIssues =
    alerts.length +
    streetLights.length +
    waste.length +
    housing.length +
    generalIssues.length;

  const activeAlerts = alerts.filter(a => a.status === "open").length;
  const resolvedAlerts = alerts.filter(a => a.status === "resolved").length;

  return (
    <>
      <Navbar />

      <div className="dashboard-full">
        <div className="dashboard-header">
          <h2>City Dashboard</h2>
          <p>Overall city issue overview</p>
        </div>

        {/* ===== STATS ===== */}
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
        </div>

        {/* ===== CHART + ACTIVITY ===== */}
        <div className="charts-section">
          {/* BAR CHART */}
          <div className="chart-card">
            <h3>Issue Distribution</h3>

            <div className="bar-chart">
              <div className="bar high" style={{ height: alerts.length * 12 }}>
                Alerts
              </div>
              <div className="bar medium" style={{ height: streetLights.length * 12 }}>
                Lights
              </div>
              <div className="bar low" style={{ height: waste.length * 12 }}>
                Waste
              </div>
              <div className="bar high" style={{ height: housing.length * 12 }}>
                Housing
              </div>
              <div className="bar medium" style={{ height: generalIssues.length * 12 }}>
                Other
              </div>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="chart-card">
            <h3>Recent Activity</h3>

            <ul className="activity-list">
              {alerts.slice(0, 4).map(a => (
                <li key={a._id}>
                  🚨 Alert reported in {a.city}
                </li>
              ))}

              {streetLights.slice(0, 2).map(l => (
                <li key={l._id}>
                  💡 Street light issue at {l.location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== RECENT ISSUES TABLE ===== */}
        <div className="recent-issues">
          <h3>Recent Issues</h3>

          <div className="issues-table">
            <div className="table-header">
              <span>Type</span>
              <span>Location</span>
              <span>Status</span>
              <span>Source</span>
            </div>

            {alerts.slice(0, 3).map(a => (
              <div key={a._id} className="table-row clickable">
                <span>{a.title}</span>
                <span>{a.city}</span>
                <span className="status high">{a.level}</span>
                <span>Alert</span>
              </div>
            ))}

            {generalIssues.slice(0, 3).map(g => (
              <div key={g._id} className="table-row clickable">
                <span>{g.title}</span>
                <span>{g.location}</span>
                <span className="status medium">{g.status}</span>
                <span>General</span>
              </div>
            ))}
          </div>

          <p className="table-hint">
            Click any row to view full details (future feature)
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
