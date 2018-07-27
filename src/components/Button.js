import React from 'react';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className={`defButton ${text}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
