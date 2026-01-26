import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jobs } from "./jobs";
import "./Position.css";

export default function Position() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const job = Array.isArray(jobs) ? jobs.find(j => j.slug === slug) : null;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!job) {
    return (
      <div className="position-page">
        <div className="position-container">
          <p>Position not found.</p>
          <Link to="/careers" className="back-link">← Back to Careers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="position-page">
      <div className="position-container">
        <div className="position-left">
          <h1 className="position-title">{job.title}</h1>
          <div className="position-meta">
            <span>{job.category}</span> • <span>{job.type}</span> • <span>{job.location}</span>
          </div>

          <div className="position-section">
            <h3>About the role</h3>
            <p>{job.description}</p>
          </div>

          <div className="position-section">
            <h3>Responsibilities</h3>
            <ul>
              <li>Collaborate with cross-functional teams.</li>
              <li>Write clean, maintainable, and testable code.</li>
              <li>Participate in code reviews and architecture discussions.</li>
              <li>Monitor and improve performance and reliability.</li>
            </ul>
          </div>

          <div className="position-section">
            <h3>Requirements</h3>
            <ul>
              <li>Relevant experience: {job.experience}</li>
              <li>Strong communication and problem-solving skills.</li>
              <li>Ability to work autonomously and as part of a team.</li>
            </ul>
          </div>
        </div>

        <aside className="position-right">
          <div className="position-card">
            <div className="position-summary">
              <div><strong>Category:</strong> {job.category}</div>
              <div><strong>Type:</strong> {job.type}</div>
              <div><strong>Experience:</strong> {job.experience}</div>
              <div><strong>Location:</strong> {job.location}</div>
              <div><strong>Deadline:</strong> {job.deadline}</div>
            </div>

            <button className="apply-cta" onClick={() => navigate("/contact")}>
              Apply Now
            </button>

            <Link to="/careers" className="back-link">← Back to Careers</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}