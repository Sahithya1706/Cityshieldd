import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");

  // ===== FETCH ALERTS =====
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

  // ===== RESOLVE / REOPEN =====
  const resolveAlert = async (id) => {
    await API.put(`/alerts/${id}/resolve`);
    fetchAlerts();
  };

  const reopenAlert = async (id) => {
    await API.put(`/alerts/${id}/reopen`);
    fetchAlerts();
  };

  // ===== FILTER =====
  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.level === filter);

  return (
    <>
      <Navbar />

      <div className="alerts-full">
        {/* HEADER */}
        <div className="alerts-header">
          <h2>City Alerts</h2>
          <p>Live alerts from backend (MongoDB)</p>
        </div>

        {/* FILTER BUTTONS */}
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
            className={`filter-btn medium ${filter === "medium" ? "active" : ""}`}
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
        {filteredAlerts.length === 0 ? (
          <div className="empty-state">
            🚨 No alerts found for this category
          </div>
        ) : (
          <div className="alerts-grid">
            {filteredAlerts.map((alert) => (
              <div key={alert._id} className="alert-card">
                <span className={`tag ${alert.level}`}>
                  {alert.level.toUpperCase()}
                </span>

                <h4>{alert.title}</h4>
                <p className="muted">
                  📍 {alert.city}
                </p>
                <p>{alert.description}</p>

                <div className="alert-actions">
                  {alert.status === "open" ? (
                    <button
                      className="resolve-btn"
                      onClick={() => resolveAlert(alert._id)}
                    >
                      Resolve
                    </button>
                  ) : (
                    <button
                      className="reopen-btn"
                      onClick={() => reopenAlert(alert._id)}
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Alerts;
