"use client";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-600  text-white pt-9 dark:bg-black ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-6">
        {/* Column 1: About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-sm">
            This is a web-based chat app powered by AI, built using Next.js.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="#">AI Chat</Link>
            </li>
            <li>
              <Link href="#">Real-time Responses</Link>
            </li>
            <li>
              <Link href="#">User Insights</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: xyz@example.com</li>
            <li>Phone: +91 1234567xxx</li>
          </ul>
        </div>

        {/* Column 4: GitHub and Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex items-center space-x-4 mt-2">
            <a
              href="https://github.com/Aayush1Singh/tutedude-front"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 text-xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center min-w-full text-sm text-gray-300 bg-gray-600 dark:bg-black">
        &copy; {new Date().getFullYear()} MedicalMD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
