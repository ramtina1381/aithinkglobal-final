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

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("There was an issue subscribing. Please try again later.");
    } finally {
      setLoading(false);
    }
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
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <Link to="careers">Careers</Link>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p>
              <strong>Email:</strong> contact@aithinkglobal.com
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

      <div className="footer-bottom">
        <p>
          &copy; 2025 <strong>AIThink Global</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
