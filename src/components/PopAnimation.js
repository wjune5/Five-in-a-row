import React from 'react';
import './PopAnimation.css';

function PopAnimation({ text }) {
  return (
    <div className="container">
      {text.split(' ').map((word, index) => (
        <span 
          key={index}
          className="pop-text"
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default PopAnimation;
// Usage:
// <PopAnimation text="Hello Amazing World" />
