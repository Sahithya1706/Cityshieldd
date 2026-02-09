import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");

  // ================= FETCH ALERTS =================
  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching alerts", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // ================= RESOLVE ALERT =================
  const resolveAlert = async (id) => {
    await API.put(`/alerts/${id}/resolve`);
    fetchAlerts();
  };

  // ================= REOPEN ALERT =================
  const reopenAlert = async (id) => {
    await API.put(`/alerts/${id}/reopen`);
    fetchAlerts();
  };

  // ================= FILTER LOGIC =================
  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.level === filter);

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="alerts-page">
          {/* HEADER */}
          <div className="alerts-header">
            <h2>City Alerts</h2>
            <p>Live alerts from backend (MongoDB)</p>
          </div>

          {/* FILTERS */}
          <div className="alerts-filters">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn high ${filter === "high" ? "active" : ""}`}
              onClick={() => setFilter("high")}
            >
              High
            </button>
            <button
              className={`filter-btn medium ${
                filter === "medium" ? "active" : ""
              }`}
              onClick={() => setFilter("medium")}
            >
              Medium
            </button>
            <button
              className={`filter-btn low ${filter === "low" ? "active" : ""}`}
              onClick={() => setFilter("low")}
            >
              Low
            </button>
          </div>

          {/* ALERT LIST */}
          <div className="alerts-list">
            {filteredAlerts.length === 0 && (
              <p>No alerts found.</p>
            )}

            {filteredAlerts.map((alert) => (
              <div key={alert._id} className="alert-card">
                <h4>{alert.title}</h4>
                <p>
                  📍 {alert.city} • {alert.level.toUpperCase()}
                </p>
                <p>{alert.description}</p>

                <div className="alert-actions">
                  <span className="tag">
                    {alert.status}
                  </span>

                  {alert.status === "open" ? (
                    <button onClick={() => resolveAlert(alert._id)}>
                      Resolve
                    </button>
                  ) : (
                    <button onClick={() => reopenAlert(alert._id)}>
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
