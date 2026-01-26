import React from "react";
import '../Contact/Contact.css'

export default function AdminContact() {
  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2 className="contact-title">Admin: Contact Management</h2>
        <p>Manage contact information and view messages.</p>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', borderRadius: '4px' }}>
          <small>Admin: Edit contact details and view submissions</small>
        </div>
      </div>

      <div className="container">
        <div className="contact-row">
          {/* Left Column */}
          <div className="contact-col-left">
            <div className="info-wrap">
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <div>
                  <h4>Address [EDITABLE]</h4>
                  <p>Oakville, Ontario, Canada</p>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-telephone"></i>
                <div>
                  <h4>Call Us [EDITABLE]</h4>
                  <p>+1 416 316 0285</p>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-envelope"></i>
                <div>
                  <h4>Email Us [EDITABLE]</h4>
                  <p>contact@aithinkglobal.com</p>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d92597.08485050796!2d-79.9701101!3d43.5094508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b5b8b8f729979%3A0x5037b28c7231bd0!2sOakville%2C%20ON!5e0!3m2!1sen!2sca!4v1742955223278!5m2!1sen!2sca"
                className="map-iframe"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Admin Message Management */}
          <div className="contact-col-right">
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h2>Contact Messages</h2>
              <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
                <small>Admin: View and manage contact form submissions</small>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h3>Recent Messages</h3>
                <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
                  <strong>John Doe</strong> - <em>Partnership Inquiry</em>
                  <p>Interested in discussing potential collaboration...</p>
                  <small>2 hours ago</small>
                </div>
                <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
                  <strong>Jane Smith</strong> - <em>Service Question</em>
                  <p>Can you provide more details about your AI consulting services?</p>
                  <small>1 day ago</small>
                </div>
              </div>

              <button style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                View All Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
