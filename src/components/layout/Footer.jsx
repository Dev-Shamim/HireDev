import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} DevHire. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
