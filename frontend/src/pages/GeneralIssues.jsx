import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GeneralIssueForm from "../components/GeneralIssueForm";
import GeneralIssueList from "../components/GeneralIssueList";
import API from "../utils/api";

const GeneralIssues = () => {
  const [issues, setIssues] = useState([]);

  // ================= FETCH ISSUES =================
  const fetchIssues = async () => {
    try {
      const res = await API.get("/general-issues");
      setIssues(res.data);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ================= ADD ISSUE (WITH IMAGE) =================
  const addIssue = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title || "Reported Issue");
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("severity", data.severity);
      formData.append("description", data.description || "");

      if (data.image) {
        formData.append("image", data.image);
      }

      await API.post("/general-issues", formData);
      alert("✅ Issue submitted successfully");
      fetchIssues();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit issue");
    }
  };

  // ================= RESOLVE ISSUE =================
  const resolveIssue = async (id) => {
    try {
      await API.put(`/general-issues/${id}/resolve`);
      fetchIssues();
    } catch (err) {
      console.error("Failed to resolve issue", err);
    }
  };

  // ================= DELETE ISSUE =================
  const deleteIssue = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/general-issues/${id}`);
      fetchIssues();
    } catch (err) {
      console.error("Failed to delete issue", err);
    }
  };

  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />

        <div className="housing-page">
          <GeneralIssueForm onAdd={addIssue} />
          <GeneralIssueList
            issues={issues}
            onResolve={resolveIssue}
            onDelete={deleteIssue}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralIssues;

