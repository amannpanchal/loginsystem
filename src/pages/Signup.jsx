import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const backendLink = "http://localhost:4000";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await axios.post(`${backendLink}/signup`, form);
      setMessage(res.data.message || "Signup successful! Check your email for verification link.");
    } catch (e) {
      const errMsg = e?.response?.data?.message || "Signup failed";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
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

        {/* Country select with phone input */}
        <PhoneInput
          country={"in"} // default country India 🇮🇳
          value={form.phoneNumber}
          onChange={(phone) => setForm((prev) => ({ ...prev, phoneNumber: `+${phone}` }))}
          inputStyle={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
          }}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
     
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
