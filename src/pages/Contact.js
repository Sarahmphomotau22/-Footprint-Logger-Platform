import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ padding: "30px 24px", maxWidth: "900px", margin: "0 auto" }}>

      {/* Page Header */}
      <div style={{
        background: "rgba(255,255,255,0.96)", borderRadius: "16px",
        padding: "28px 30px", marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderLeft: "6px solid #0288d1", textAlign: "center"
      }}>
        <h1 style={{
          color: "#2e7d32", margin: 0, fontSize: "2rem", fontWeight: "800"
        }}>
          📬 Contact Us
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "0.95rem" }}>
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
      }}>

        {/* Contact Info */}
        <div style={{
          background: "rgba(255,255,255,0.96)", borderRadius: "16px",
          padding: "28px 24px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ color: "#2e7d32", marginBottom: "22px", fontWeight: "700", fontSize: "1.1rem" }}>
            Get In Touch
          </h3>

          {[
            { icon: "📧", label: "Email", value: "hello@footprintlogger.com" },
            { icon: "📍", label: "Location", value: "South Africa" },
            { icon: "🕒", label: "Support Hours", value: "Mon–Fri, 9am–5pm SAST" },
            { icon: "💬", label: "Response Time", value: "Within 24 hours" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              marginBottom: "20px"
            }}>
              <span style={{
                fontSize: "1.3rem", background: "#f0fdf4",
                padding: "10px", borderRadius: "10px", lineHeight: 1
              }}>
                {item.icon}
              </span>
              <div>
                <p style={{ fontWeight: "700", margin: 0, color: "#374151", fontSize: "0.9rem" }}>
                  {item.label}
                </p>
                <p style={{ color: "#6b7280", margin: "3px 0 0", fontSize: "0.85rem" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "20px", marginTop: "4px" }}>
            <p style={{ fontWeight: "700", color: "#374151", marginBottom: "12px", fontSize: "0.9rem" }}>
              🌍 Our Mission
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: "1.6" }}>
              We help individuals track and reduce their carbon footprint — one activity at a time.
              Together, small changes create big impact.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          background: "rgba(255,255,255,0.96)", borderRadius: "16px",
          padding: "28px 24px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ color: "#2e7d32", marginBottom: "20px", fontWeight: "700", fontSize: "1.1rem" }}>
            Send a Message
          </h3>

          {success && (
            <div style={{
              background: "#dcfce7", color: "#16a34a", padding: "12px 16px",
              borderRadius: "8px", marginBottom: "16px", fontSize: "0.88rem",
              borderLeft: "4px solid #16a34a"
            }}>
              ✅ Message sent! We'll get back to you within 24 hours.
            </div>
          )}

          {error && (
            <div style={{
              background: "#fee2e2", color: "#dc2626", padding: "12px 16px",
              borderRadius: "8px", marginBottom: "16px", fontSize: "0.88rem",
              borderLeft: "4px solid #dc2626"
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Name & Email row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
                Your Name *
              </label>
              <input
                placeholder="Full name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ margin: 0, fontSize: "0.9rem" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
                Email Address *
              </label>
              <input
                placeholder="you@example.com"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ margin: 0, fontSize: "0.9rem" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
              Subject
            </label>
            <input
              placeholder="What is this about?"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              style={{ margin: 0, fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#374151", display: "block", marginBottom: "5px" }}>
              Message *
            </label>
            <textarea
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ margin: 0, minHeight: "130px", fontSize: "0.9rem", resize: "vertical" }}
            />
          </div>

          <button
            onClick={handleSend}
            style={{ background: "linear-gradient(to right,#2e7d32,#0288d1)", fontWeight: "700" }}
          >
            Send Message 📨
          </button>
        </div>
      </div>
    </div>
  );
}
