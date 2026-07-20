import React from "react";
import { FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Example({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <div className="max-w-5xl w-full mx-auto p-10 text-gray-800">
      <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">
        {dict.badge}
      </span>
      <h1 className="text-4xl font-bold text-left mt-4">{dict.title}</h1>
      <p className="text-left mt-4">
        {dict.intro}{" "}
        <a
          href={`mailto:${dict.emailValue}`}
          className="text-indigo-600 hover:underline"
        >
          {dict.emailValue}
        </a>
      </p>
      <div className="grid md:grid-cols-3 mt-16">
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaEnvelope className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">{dict.emailLabel}</p>
          <p className="text-gray-500 mt-1 mb-4">{dict.emailDescription}</p>
          <a
            href={`mailto:${dict.emailValue}`}
            className="text-indigo-600 font-semibold"
          >
            {dict.emailValue}
          </a>
        </div>
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaLinkedin className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">{dict.linkedinLabel}</p>
          <p className="text-gray-500 mt-1 mb-4">{dict.linkedinDescription}</p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold hover:underline"
          >
            {dict.linkedinValue}
          </a>
        </div>
        <div>
          <span className="flex items-center justify-center text-indigo-500 bg-indigo-500/20 p-2.5 aspect-square rounded-full size-10">
            <FaPhone className="size-5" />
          </span>
          <p className="text-lg font-bold mt-2">{dict.phoneLabel}</p>
          <p className="text-gray-500 mt-1 mb-4">{dict.phoneDescription}</p>
          <span className="text-indigo-600 font-semibold">
            {dict.phoneValue}
          </span>
        </div>
      </div>
    </div>
  );
}
