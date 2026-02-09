import { useState } from "react";

const WasteList = ({ items, onResolve }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Define the base URL for images
  const API_BASE_URL = "http://localhost:5000";

  const filtered = items.filter((w) => {
    const matchText =
      w.location.toLowerCase().includes(search.toLowerCase()) ||
      w.type.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || w.status === filter;

    return matchText && matchFilter;
  });

  return (
    <div>
      <h3>Waste Collection Requests</h3>

      <div className="waste-controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filtered.length === 0 && <p>No requests found.</p>}

      {filtered.map((item) => (
        <div className="waste-card" key={item._id}>
          {/* --- IMAGE SECTION START --- */}
          {item.image && (
            <div className="waste-image-container">
              <img 
                src={`${API_BASE_URL}${item.image}`} 
                alt="Waste evidence" 
                className="waste-thumbnail"
              />
            </div>
          )}
          {/* --- IMAGE SECTION END --- */}

          <div className="waste-info">
            <h4>{item.type}</h4>
            <p>📍 {item.location}</p>
            {item.description && (
              <p className="waste-desc">{item.description}</p>
            )}
          </div>

          <div className="waste-actions">
            <span className={`waste-status ${item.status}`}>
              {item.status}
            </span>

            {item.status === "scheduled" ? (
              <button onClick={() => onResolve(item._id, "scheduled")}>
                Mark Done
              </button>
            ) : (
              <button onClick={() => onResolve(item._id, "done")}>
                Reopen
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WasteList;
