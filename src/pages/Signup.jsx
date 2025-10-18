import React, { useState } from "react";
import { signup } from "../functions";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [verifyLink, setVerifyLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setVerifyLink(null);
    setLoading(true);

    try {
      const res = await signup(form);
      setMessage(res.data.message || "Signup success. Check verification link below.");
      if (res.data.verifyLink) setVerifyLink(res.data.verifyLink);
    } catch (e) {
      const errMsg = e?.response?.data?.message || "Signup failed";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      {message && (
        <p className={`message ${verifyLink ? "success" : ""}`}>{message}</p>
      )}
      {verifyLink && (
        <a className="verify-link" href={verifyLink}>
          Verify your email
        </a>
      )}
    </div>
  );
};

export default Signup;
