import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  // Restoring the code
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  // Adjusting the
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Another changeé
    setLoading(true);
    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setShowModal(true);
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("There was an issue subscribing. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSent(false);
  };

  return (
    <footer id="footer" className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="container text-center">
          <h2>Stay Updated</h2>
          <p>
            Join our newsletter for updates on new features, releases, and
            community news.
          </p>
          <form className="php-email-form" onSubmit={handleSubscribe}>
            <div className="newsletter-form">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" disabled={loading}>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            <div className="form-status">
              {loading && <div className="loading">Loading...</div>}
              {error && <div className="error-message">{error}</div>}
              {sent && (
                <div className="sent-message">Thank you for subscribing!</div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              {/* <li>
                <a href="#about">About</a>
              </li> */}
              <li>
                <Link to="careers">Careers</Link>
              </li>
              <li>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <button
                  className="footer-link-btn"
                  onClick={() => setShowPrivacyModal(true)}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="footer-link-btn"
                  onClick={() => setShowTermsModal(true)}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
          {/* adjusting a code */}
          <div className="footer-column">
            <h4>Contact</h4>
            <p>
              <strong>Email:</strong> saeid@aithinkglobal.com
            </p>
            <p>
              <strong>Phone:</strong> +1 416 316 0285
            </p>
            <p>
              <strong>Address:</strong> Oakville, Ontario, Canada
            </p>
          </div>
        </div>
      </div>
      {/* Made some changes */}
      {/* make some other changes */}
      <div className="footer-bottom">
        <p>
          &copy; 2025 <strong>AIThink Global</strong>. All rights reserved.
        </p>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Subscription Successful!</h3>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>✓ Thank you for subscribing!</p>
              <p>
                You will now receive updates on new features, releases, and
                community news.
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-confirm" onClick={closeModal}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Privacy Policy</h3>
              <button
                className="modal-close"
                onClick={() => setShowPrivacyModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body modal-body-scrollable">
              {/* <p><strong>Last Updated: February 24, 2026</strong></p> */}

              <h4>Your Information is Secure</h4>
              <p>
                When you login and submit your resume on AIThink Global, your
                personal information is protected with industry-standard
                security measures and encryption.
              </p>

              <h4>How We Use Your Data</h4>
              <p>
                Your information is{" "}
                <strong>solely used for hiring purposes</strong>. We review your
                resume and contact details to evaluate your fit for open
                positions at AIThink Global.
              </p>

              <h4>Data Protection</h4>
              <p>
                We implement administrative, technical, and physical safeguards
                to protect your personal data. Your information will not be
                shared with third parties without your consent.
              </p>

              <h4>Your Rights</h4>
              <p>
                You have the right to request access to, or deletion of, your
                personal information at any time. Contact us at{" "}
                <strong>saeid@aithinkglobal.com</strong> to exercise these
                rights.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn-confirm"
                onClick={() => setShowPrivacyModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Terms of Service</h3>
              <button
                className="modal-close"
                onClick={() => setShowTermsModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body modal-body-scrollable">
              {/* <p><strong>Last Updated: February 24, 2026</strong></p> */}

              <h4>Account Usage</h4>
              <p>
                By creating an account and submitting your resume, you agree to
                use AIThink Global's hiring platform for legitimate job
                application purposes only.
              </p>

              <h4>Resume Submission</h4>
              <p>
                You warrant that all information provided in your resume is
                accurate and truthful. Resumes containing false or misleading
                information may result in disqualification.
              </p>

              <h4>Intellectual Property</h4>
              <p>
                All materials on this platform are owned by AIThink Global. You
                may not reproduce, distribute, or transmit any content without
                our permission.
              </p>

              <h4>Limitation of Liability</h4>
              <p>
                AIThink Global is not liable for any indirect, incidental, or
                consequential damages arising from your use of this platform or
                hiring process.
              </p>

              <h4>Modifications</h4>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use of the platform constitutes acceptance of updated
                terms.
              </p>

              <h4>Governing Law</h4>
              <p>These terms are governed by the laws of Ontario, Canada.</p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn-confirm"
                onClick={() => setShowTermsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
