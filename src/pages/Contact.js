import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "30px 40px", maxWidth: "700px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.95)", borderRadius: "16px",
        padding: "24px 30px", marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderLeft: "6px solid #0288d1"
      }}>
        <h2 style={{ color: "#2e7d32", margin: 0 }}>📬 Contact Us</h2>
        <p style={{ color: "#888", marginTop: "6px" }}>
          Have a question or suggestion? We'd love to hear from you.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "24px", marginBottom: "24px"
      }}>
        {/* Contact Info */}
        <div style={{
          background: "rgba(255,255,255,0.95)", borderRadius: "16px",
          padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#2e7d32", marginBottom: "20px" }}>Get In Touch</h3>
          {[
            { icon: "📧", label: "Email", value: "hello@footprintlogger.com" },
            { icon: "📍", label: "Location", value: "South Africa" },
            { icon: "🕒", label: "Hours", value: "Mon–Fri, 9am–5pm" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              marginBottom: "18px"
            }}>
              <span style={{
                fontSize: "1.4rem", background: "#f0fdf4",
                padding: "8px", borderRadius: "8px"
              }}>
                {item.icon}
              </span>
              <div>
                <p style={{ fontWeight: "600", margin: 0, color: "#374151" }}>
                  {item.label}
                </p>
                <p style={{ color: "#6b7280", margin: "2px 0 0", fontSize: "0.9rem" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div style={{
          background: "rgba(255,255,255,0.95)", borderRadius: "16px",
          padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#2e7d32", marginBottom: "16px" }}>Send a Message</h3>

          {success && (
            <div className="alert-success">
              ✅ Message sent! We'll get back to you soon.
            </div>
          )}

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ minHeight: "100px" }}
          />
          <button onClick={handleSend} style={{
            background: "linear-gradient(to right, #2e7d32, #0288d1)",
            marginTop: "8px"
          }}>
            Send Message 📨
          </button>
        </div>
      </div>
    </div>
  );
}