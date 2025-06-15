import React from "react";

const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M20.39 3H17.5L12.94 8.68 8.87 3H3l7.16 10.15L3 21h2.89l4.93-5.96 4.35 5.96h5.83l-7.65-10.39L20.39 3z" />
  </svg>
);

export default XIcon;
