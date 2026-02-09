const GeneralIssueList = ({ issues, onResolve, onDelete }) => {
  const API_BASE = "http://localhost:5000";

  return (
    <div>
      <h3>Reported Issues</h3>

      {issues.length === 0 && <p>No issues reported.</p>}

      {issues.map((item) => (
        <div key={item._id} className="hc-card">
          <div>
            <h4>{item.title || "Untitled Issue"}</h4>

            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Severity:</strong> {item.severity}</p>

            {item.description && (
              <p className="hc-desc">{item.description}</p>
            )}

            {/* ✅ IMAGE — CORRECT WAY */}
            {item.image && (
              <img
                src={`${API_BASE}${item.image}`}
                alt="Issue"
                style={{
                  width: "100%",
                  maxHeight: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          <div className="hc-actions">
            <span className={`hc-status ${item.status}`}>
              {item.status}
            </span>

            {item.status !== "resolved" && (
              <button
                className="resolve-btn"
                onClick={() => onResolve(item._id)}
              >
                ✅ Mark Resolved
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => onDelete(item._id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralIssueList;
