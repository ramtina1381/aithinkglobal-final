import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jobs } from "./jobs";
import { db, storage } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ApplicationForm.css";

export default function ApplicationForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const job = Array.isArray(jobs) ? jobs.find((j) => j.slug === slug) : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  });

  const [files, setFiles] = useState({
    resume: null,
    coverLetter: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!job) {
    return (
      <div className="application-form-page">
        <div className="form-container">
          <p>Position not found.</p>
          <Link to="/careers" className="back-link">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: fileList[0],
      }));
    }
  };

  const uploadFileToFirebase = async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("File upload error:", error);
      throw new Error("Failed to upload file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (!files.resume || !files.coverLetter) {
        setError("Please upload both resume and cover letter");
        setLoading(false);
        return;
      }

      // Upload files
      const timestamp = Date.now();
      const resumePath = `applications/${formData.email}_${timestamp}_resume`;
      const coverLetterPath = `applications/${formData.email}_${timestamp}_coverLetter`;

      const [resumeURL, coverLetterURL] = await Promise.all([
        uploadFileToFirebase(files.resume, resumePath),
        uploadFileToFirebase(files.coverLetter, coverLetterPath),
      ]);

      // Save application to Firestore
      await addDoc(collection(db, "applications"), {
        jobTitle: job.title,
        jobSlug: job.slug,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        motivation: formData.motivation,
        resumeURL,
        coverLetterURL,
        resumeFileName: files.resume.name,
        coverLetterFileName: files.coverLetter.name,
        submittedAt: new Date(),
        status: "pending",
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/careers");
      }, 2000);
    } catch (err) {
      setError(
        err.message || "An error occurred while submitting your application",
      );
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Apply for {job.title}</h1>
          <p className="job-info">
            {job.category} • {job.location}
          </p>
        </div>

        {success && (
          <div className="success-message">
            <h3>✓ Application Submitted Successfully!</h3>
            <p>We'll review your application and get back to you soon.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="application-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="John"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="form-section">
            <h3>Professional Information</h3>

            <div className="form-group full-width">
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5 years in web development"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="motivation">Why do you want to join us?</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Tell us about your interest in this role and our company..."
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* Documents Section */}
          <div className="form-section">
            <h3>Documents</h3>

            <div className="form-group full-width">
              <label htmlFor="resume">Resume/CV *</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
                <span className="file-name">
                  {files.resume
                    ? files.resume.name
                    : "Choose a PDF or Word document"}
                </span>
              </div>
              <small>Supported formats: PDF, DOC, DOCX (Max 5MB)</small>
            </div>

            <div className="form-group full-width">
              <label htmlFor="coverLetter">Cover Letter *</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
                <span className="file-name">
                  {files.coverLetter
                    ? files.coverLetter.name
                    : "Choose a PDF or Word document"}
                </span>
              </div>
              <small>Supported formats: PDF, DOC, DOCX (Max 5MB)</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <Link to="/careers" className="btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
