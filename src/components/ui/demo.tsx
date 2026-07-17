import React from "react";
import { FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa";

export default function Example() {
  return (
    <div className="max-w-5xl w-full mx-auto p-10 text-gray-800">
      <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">Reach Out To Us</span>
      <h1 className="text-4xl font-bold text-left mt-4">
        We&apos;d love to Hear From You.
      </h1>
      <p className="text-left mt-4">
        Or just reach out manually to
        <a href="mailto:contact@example.com" className="text-indigo-600 hover:underline">contact@example.com</a>
      </p>
      <div className="grid md:grid-cols-3 mt-16">
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaEnvelope className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">Email Support</p>
          <p className="text-gray-500 mt-1 mb-4">Our team can respond in real time.</p>
          <a href="mailto:support@example.com" className="text-indigo-600 font-semibold">
            support@example.com
          </a>
        </div>
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaLinkedin className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">LinkedIn</p>
          <p className="text-gray-500 mt-1 mb-4">Connect with me on LinkedIn.</p>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
            linkedin.com
          </a>
        </div>
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaPhone className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">Call Us Directly</p>
          <p className="text-gray-500 mt-1 mb-4">Available during working hours.</p>
          <span className="text-indigo-600 font-semibold">
            (+1) 234 - 4567 - 789
          </span>
        </div>
      </div>
    </div>
  );
}
