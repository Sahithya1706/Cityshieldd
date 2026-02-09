import { useState } from "react";

const WasteForm = ({ onAdd }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null); // New state for the image

  const submit = (e) => {
    e.preventDefault();
    if (!location || !type) return;

    // 1. Prepare FormData to handle the file + text fields
    const formData = new FormData();
    formData.append("location", location);
    formData.append("type", type);
    formData.append("description", desc); // Make sure this matches your backend field name
    if (file) {
      formData.append("image", file); // "image" must match your upload.single("image")
    }

    // 2. Pass the formData up to the parent component
    onAdd(formData);

    // 3. Reset form
    setLocation("");
    setType("");
    setDesc("");
    setFile(null);
    // Reset file input manually because it's an uncontrolled component
    e.target.reset(); 
  };

  return (
    <form className="waste-form" onSubmit={submit}>
      <h3>Request Waste Collection</h3>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Waste Type</option>
        <option value="Dry Waste">Dry Waste</option>
        <option value="Wet Waste">Wet Waste</option>
        <option value="Bulk Waste">Bulk Waste</option>
      </select>

      <textarea
        placeholder="Additional details"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      {/* 4. New Image Upload Input */}
      <div className="file-upload">
        <label htmlFor="waste-img">Add Photo Evidence:</label>
        <input
          id="waste-img"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button className="cta-btn">Submit Request</button>
    </form>
  );
};

export default WasteForm;
