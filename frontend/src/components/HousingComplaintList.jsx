import { useState } from "react";

const HousingComplaintList = ({ complaints, onStatusChange }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredComplaints = complaints.filter((c) => {
    const matchSearch =
      c.flat.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="hc-list">
      <h3>Complaints</h3>

      {/* SEARCH + FILTER */}
      <div className="hc-controls">
        <input
          type="text"
          placeholder="Search by flat or issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {filteredComplaints.length === 0 && <p>No complaints found.</p>}

      {filteredComplaints.map((item) => (
        <div key={item.id} className="hc-card">
          <div>
            <h4>{item.type}</h4>
            <p>🏠 Flat: {item.flat}</p>
            <p className="hc-date">📅 {item.date}</p>
            {item.desc && <p className="hc-desc">{item.desc}</p>}
          </div>

          <div className="hc-actions">
            <span className={`hc-status ${item.status.replace(" ", "-")}`}>
              {item.status}
            </span>

            {item.status !== "Resolved" && (
              <select
                onChange={(e) =>
                  onStatusChange(item.id, e.target.value)
                }
                defaultValue=""
              >
                <option value="">Change Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HousingComplaintList;
