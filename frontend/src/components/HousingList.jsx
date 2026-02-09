import { useState } from "react";

const HousingList = ({ items, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = items.filter((c) => {
    const matchText =
      c.flat.toLowerCase().includes(search.toLowerCase()) ||
      c.issue.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || c.status === filter;

    return matchText && matchFilter;
  });

  return (
    <div>
      <h3>Housing Complaints</h3>

      <div className="hc-controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Open">Open</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {filtered.length === 0 && <p>No complaints found.</p>}

      {filtered.map((item) => (
        <div className="hc-card" key={item._id}>
          <div>
            <h4>{item.issue}</h4>
            <p>🏠 {item.flat}</p>
            {item.description && (
              <p className="hc-desc">{item.description}</p>
            )}
          </div>

          <div className="hc-actions">
            <span className={`hc-status ${item.status}`}>
              {item.status}
            </span>

            <select
              value={item.status}
              onChange={(e) =>
                onUpdate(item._id, e.target.value)
              }
            >
              <option value="Open">Open</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HousingList;
