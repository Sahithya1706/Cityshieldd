import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GeneralIssueForm from "../components/GeneralIssueForm";
import GeneralIssueList from "../components/GeneralIssueList";
import API from "../utils/api";

const GeneralIssues = () => {
  const [issues, setIssues] = useState([]);

  // FETCH ALL ISSUES
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

  // ADD ISSUE (WITH IMAGE)
  const addIssue = async (data) => {
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
    fetchIssues();
  };

  // RESOLVE ISSUE
  const resolveIssue = async (id) => {
    await API.put(`/general-issues/${id}/resolve`);
    fetchIssues();
  };

  // DELETE SINGLE ISSUE
  const deleteIssue = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (!confirmDelete) return;

    await API.delete(`/general-issues/${id}`);
    fetchIssues();
  };

  // DELETE ALL ISSUES
  const deleteAllIssues = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL reported issues?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete("/general-issues");
      fetchIssues();
    } catch (err) {
      console.error("Delete all failed", err);
      alert("Failed to delete all issues");
    }
  };

  return (
    <>
      <Navbar />

      {/* FULL SCREEN GENERAL ISSUES PAGE */}
      <div className="general-full">
        <div className="general-header">
          <h2>Other / General Issues</h2>
          <p>Report and manage city issues not covered elsewhere</p>

          <div className="general-actions">
            <button className="danger-btn" onClick={deleteAllIssues}>
              🗑️ Delete All Issues
            </button>
          </div>
        </div>

        <div className="general-layout">
          <GeneralIssueForm onAdd={addIssue} />
          <GeneralIssueList
            issues={issues}
            onResolve={resolveIssue}
            onDelete={deleteIssue}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralIssues;
