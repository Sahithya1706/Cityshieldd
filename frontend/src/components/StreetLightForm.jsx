import { useState } from "react";

const StreetLightForm = ({ onAdd }) => {
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !issue) return;

    onAdd({ location, issue, desc });

    setLocation("");
    setIssue("");
    setDesc("");
  };

  return (
    <form className="sl-form" onSubmit={handleSubmit}>
      <h3>Report Street Light Fault</h3>

      <input
        type="text"
        placeholder="Location (e.g. Andheri West)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={issue} onChange={(e) => setIssue(e.target.value)}>
        <option value="">Select Issue</option>
        <option value="Light not working">Light not working</option>
        <option value="Flickering light">Flickering light</option>
        <option value="Broken pole">Broken pole</option>
      </select>

      <textarea
        placeholder="Additional details (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button type="submit" className="cta-btn">
        Submit Report
      </button>
    </form>
  );
};

export default StreetLightForm;
