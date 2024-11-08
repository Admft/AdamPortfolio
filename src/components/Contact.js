// src/components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="p-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="text-gray-700 mb-4">
        I'm always open to discussing new projects or opportunities. Feel free to reach out!
      </p>
      <a href="mailto:youremail@example.com" className="text-blue-500 hover:underline">
        youremail@example.com
      </a>
    </section>
  );
};

export default Contact;
