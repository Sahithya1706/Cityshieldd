import { useState } from "react";

const HousingComplaintForm = ({ onAdd }) => {
  const [flat, setFlat] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!flat || !type) return;

    onAdd({
      id: Date.now(),
      flat,
      type,
      desc,
      status: "Open",
      date: new Date().toLocaleDateString(),
    });

    setFlat("");
    setType("");
    setDesc("");
  };

  return (
    <form className="hc-form" onSubmit={handleSubmit}>
      <h3>Raise a Complaint</h3>

      <input
        type="text"
        placeholder="Flat / House No (e.g. A-203)"
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Complaint Type</option>
        <option value="Water Issue">Water Issue</option>
        <option value="Electricity Issue">Electricity Issue</option>
        <option value="Lift Problem">Lift Problem</option>
        <option value="Noise Complaint">Noise Complaint</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        placeholder="Complaint description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button type="submit" className="cta-btn">
        Submit Complaint
      </button>
    </form>
  );
};

export default HousingComplaintForm;
