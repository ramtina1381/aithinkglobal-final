import React, { useState, useEffect } from "react";
import "../Careers/Careers.css";
import { useNavigate } from "react-router-dom";
import { jobs } from "../Careers/jobs";

export default function AdminCareers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-section">
        <div className="careers-content">
          <h1>ADMIN: CAREER MANAGEMENT</h1>
          <p>
            Manage job postings, applications, and career opportunities.
          </p>
          <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', borderRadius: '4px' }}>
            <small>Admin: Create, edit, and manage job postings</small>
          </div>
          <div className="careers-buttons">
            <button className="btn-primary" style={{ backgroundColor: '#28a745' }}>
              <a href="#careers">Add New Job</a>
            </button>
            <button className="btn-outline">View Applications</button>
          </div>
        </div>
      </section>

      {/* Admin Tools Section */}
      <section className="benefits">
        <h2>Admin Career Management Tools</h2>
        <div className="benefit-grid">
          <div className="benefit-card">
            <h3>📝 Create Jobs</h3>
            <p>Add new job postings with detailed descriptions and requirements.</p>
          </div>
          <div className="benefit-card">
            <h3>✏️ Edit Jobs</h3>
            <p>Update existing job postings and manage application deadlines.</p>
          </div>
          <div className="benefit-card">
            <h3>📊 View Applications</h3>
            <p>Review and manage job applications from candidates.</p>
          </div>
          <div className="benefit-card">
            <h3>🗑️ Delete Jobs</h3>
            <p>Remove outdated or filled positions from the careers page.</p>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="careers" id="careers">
        <h2>Admin: Career Openings Management</h2>
        <p>
          Manage all job postings and applications from this interface.
        </p>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
          <small>Admin: Click on jobs to edit or manage applications</small>
        </div>

        <div className="job-search">
          <input
            type="text"
            placeholder="Keywords/job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Support">Support</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
          <input type="text" placeholder="Location" />
          <button className="btn-primary">Filter Jobs</button>
        </div>

        <div className="job-list">
          {filteredJobs.map((job, index) => (
            <div key={index} className="job-card" style={{ border: '2px solid #007bff' }}>
              <h3 className="job-title">{job.title} [ADMIN]</h3>
              
              <div className="job-info">
                <div className="job-field">
                  <span className="label">Category</span>
                  <span className="value">{job.category}</span>
                </div>

                <div className="job-field">
                  <span className="label">Experience</span>
                  <span className="value">{job.experience}</span>
                </div>

                <div className="job-field">
                  <span className="label">Deadline</span>
                  <span className="value">{job.deadline}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  className="apply-btn"
                  onClick={() => navigate(`/admin/careers/${job.slug || job.title.toLowerCase().replace(/\s+/g, "-")}`)}
                  style={{ backgroundColor: '#007bff' }}
                >
                  Edit Job
                </button>
                <button
                  style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Applications
                </button>
                <button
                  style={{ 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
