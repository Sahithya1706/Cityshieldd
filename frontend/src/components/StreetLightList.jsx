import { useState } from "react";

const StreetLightList = ({ faults, onResolve }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredFaults = faults.filter((f) => {
    const matchSearch =
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.issue.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || f.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="sl-list">
      <h3>Reported Faults</h3>

      <div className="sl-controls">
        <input
          type="text"
          placeholder="Search by location or issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      {filteredFaults.length === 0 && <p>No reports found.</p>}

      {filteredFaults.map((item) => (
        <div key={item._id} className="sl-card">
          <div>
            <h4>{item.issue}</h4>
            <p>📍 {item.location}</p>
            {item.description && (
              <p className="sl-desc">{item.description}</p>
            )}
          </div>

          <div className="sl-actions">
            <span className={`sl-status ${item.status}`}>
              {item.status}
            </span>

            {item.status === "pending" ? (
              <button onClick={() => onResolve(item._id, "pending")}>
                Mark Fixed
              </button>
            ) : (
              <button onClick={() => onResolve(item._id, "fixed")}>
                Reopen
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreetLightList;
