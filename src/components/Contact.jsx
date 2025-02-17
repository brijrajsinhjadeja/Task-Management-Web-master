import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
    .send(
      "service_wvt7lnl",  // Replace with EmailJS service ID
      "template_vio153s", // Replace with EmailJS template ID
      formData,
      "RY2z-Q-f3zq2VInSB"   // Replace with EmailJS public key
    )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("✅ Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus("❌ Failed to send message. Try again later.");
        }
      );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center  justify-center w-[70%] mx-auto  min-h-screen bg-dark-100">
      <div className="bg-dark p-8 rounded-2xl shadow-lg w-full  max-w-md border-4 border-orange-400 to-red-400">
        <h2 className="text-3xl font-bold my-8 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center">Contact Us</h2>

        {status && <p className="text-center font-semibold text-green-700">{status}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-dark">
          <div>
            <label className="text-1xl font-bold my-8 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center ">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border-2 border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-1xl font-bold my-8 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border-2 border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-1xl font-bold my-8 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border-2 border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-md hover:bg-red-600 transition duration-300 "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
