import { useState } from "react";

const HousingForm = ({ onAdd }) => {
  const [flat, setFlat] = useState("");
  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!flat || !issue) return;

    onAdd({ flat, issue, desc });

    setFlat("");
    setIssue("");
    setDesc("");
  };

  return (
    <form className="hc-form" onSubmit={submit}>
      <h3>Raise Housing Complaint</h3>

      <input
        placeholder="Flat / House No"
        value={flat}
        onChange={(e) => setFlat(e.target.value)}
      />

      <select value={issue} onChange={(e) => setIssue(e.target.value)}>
        <option value="">Select Issue</option>
        <option value="Water Leakage">Water Leakage</option>
        <option value="Lift Not Working">Lift Not Working</option>
        <option value="Noise Issue">Noise Issue</option>
        <option value="Electricity Problem">Electricity Problem</option>
      </select>

      <textarea
        placeholder="Additional details"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="cta-btn">Submit Complaint</button>
    </form>
  );
};

export default HousingForm;
