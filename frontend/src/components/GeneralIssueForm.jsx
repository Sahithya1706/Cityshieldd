import { useState } from "react";

const GeneralIssueForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeImage = (file) => {
    const name = file.name.toLowerCase();

    if (name.includes("road")) {
      setCategory("Road");
      setSeverity("High");
      setDescription("Possible road damage detected from image.");
    } else if (name.includes("garbage")) {
      setCategory("Waste");
      setSeverity("Medium");
      setDescription("Garbage issue detected from image.");
    } else if (name.includes("light")) {
      setCategory("Street Light");
      setSeverity("High");
      setDescription("Street light issue detected from image.");
    } else {
      setCategory("Other");
      setSeverity("Low");
      setDescription("Issue reported via image upload.");
    }

    setTitle("Issue reported using image");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    analyzeImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!category || !location || !severity) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    await onAdd({
      title,
      category,
      location,
      severity,
      description,
      image,
    });

    setTitle("");
    setCategory("");
    setLocation("");
    setSeverity("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setLoading(false);
  };

  return (
    <form className="hc-form" onSubmit={submit}>
      <h3>Report General Issue</h3>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            margin: "12px 0",
          }}
        />
      )}

      <input
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Road">Road</option>
        <option value="Waste">Waste</option>
        <option value="Street Light">Street Light</option>
        <option value="Water">Water</option>
        <option value="Other">Other</option>
      </select>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="">Severity</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="cta-btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit Issue"}
      </button>
    </form>
  );
};

export default GeneralIssueForm;
