import React from "react";
import "../HomePage/HomePage.css";
import { FaLinkedin } from 'react-icons/fa';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Admin: Intelligent Solutions</h1>
        <h1>Smarter Business</h1>
        <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
          <small>Admin View - You can edit this content</small>
        </div>
      </div>
      <div className="hero-image"></div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="mission-section">
      <div className="mission-container">
        <div className="mission-content">
          <div className="service-item">
            <div className="icon">
              <i className="bi bi-activity"></i>
            </div>
            <h4>
              <a href="/" className="title-link">
                Admin: Reshaping Intelligence Around Us
              </a>
            </h4>
            <p className="description">
              [ADMIN EDITABLE] Our mission is to thoughtfully build AI powered software and
              solutions that advance industries and enrich lives with precision and purpose.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', borderRadius: '4px' }}>
              <small>Admin: Click to edit this mission statement</small>
            </div>
          </div>
        </div>
        <img src="/assets/img/2.png" className="mission-image" alt="Mission" />
      </div>
    </section>
  );
}

function Services() {
  const services = [
    "Cloud and Infrastructure",
    "App development and Quality Engineering", 
    "Data Automation and AI",
    "Consulting Services",
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Admin: Our Services</h2>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <small>Admin: Manage services list</small>
        </div>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className={`service-box service-box-${idx}`}>
              <p>{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="team" className="leadership-section">
      <div className="section-title">
        <h2>Admin: Our Leadership</h2>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
          <small>Admin: Edit team member information</small>
        </div>
      </div>
      <div className="leadership-container">
        <div className="leader-card">
          <div className="member-info">
            <h4>Zohreh Sanaei (PhD)</h4>
            <span>Chief Experience Officer</span>
            <div className="social"> 
              <a href="https://www.linkedin.com/in/zohrehsanaei/"><FaLinkedin size={24} color="#0077B5" /></a>
            </div>
            <p>
              [ADMIN EDITABLE] Zohreh Sanaei is a visionary leader in AI and data science, dedicated to transforming complex challenges into seamless, data-driven solutions. With a PhD in Computer Science and over 12 years of experience, she specializes in driving AI innovation that enhances business performance and customer experiences.
            </p>
            <p>
              As Chief Experience Officer at AIThink LTD, Zohreh focuses on bridging the gap between AI technology and real-world applications. She simplifies complex AI/ML models into actionable strategies, ensuring businesses thrive with AI. Her leadership fosters innovation and guides teams to deliver measurable success.
            </p>
            <p>
              Passionate about making AI accessible and impactful, Zohreh is committed to helping organizations harness the full potential of artificial intelligence—creating smarter, more efficient, and customer-centric experiences.
            </p>
          </div>
        </div>

        <div className="leader-card">
          <div className="member-info">
            <h4>Saeid Abolfazli (PhD)</h4>
            <span>Co-Founder</span>
            <div className="social">
              <a href="https://www.linkedin.com/in/saeidabolfazli/"><FaLinkedin size={24} color="#0077B5" /></a>
            </div>
            <p>
              [ADMIN EDITABLE] Saeid is an AI strategist, educator, and innovator dedicated to making AI practical and transformative for businesses. He leverages deep expertise in AI/ML, data science, and technology leadership to help organizations integrate AI solutions that drive efficiency and growth.
            </p>
            <p>
              He has been teaching AI and machine learning at the University of Toronto and the Vector Institute for AI, shaping the next generation of AI talent. His work bridges cutting-edge research with real-world applications to ensure AI is not just innovative but also ethical and impactful.
            </p>
            <p>
              Saeid empowers businesses with AI-driven strategies that enhance decision-making, streamline operations, and create lasting value in an evolving digital landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="Locations" className="locations section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="locations-title">Admin: Locations</h2>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
          <small>Admin: Manage office locations</small>
        </div>

        <div className="locations-container">
          <img
            src="assets/img/dot-map.png"
            alt="North America Map"
            className="map"
          />

          <div className="locations-box">
            <h3 className="locations-subtitle">Canada</h3>
            <ul className="locations-list">
              <li>Toronto</li>
              <li>Vancouver</li>
              <li>Montreal</li>
              <li>Calgary</li>
              <li>Ottawa</li>
            </ul>

            <h3 className="locations-subtitle">United States of America</h3>
            <ul className="locations-list">
              <li>New York</li>
              <li>Miami</li>
              <li>Chicago</li>
              <li>Dallas</li>
              <li>Denver</li>
              <li>Los Angeles</li>
              <li>Seattle</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminHomePage() {
  return (
    <>
      <main>
        <Hero />
        <Mission />
        <Services />
        <Leadership />
        <Locations />
      </main>
    </>
  );
}
