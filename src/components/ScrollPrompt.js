import React, { useState, useEffect } from 'react';
import DisplayBooksComponent from './DisplayBooksComponent.js';

function ExploreSection() {
  return (
    <div className="text-center my-4 slide-in" style={{ backgroundColor: "black", opacity: 0.8 }}>
      <h2 style={{ color: '#F8E231', fontSize: 33, fontStyle: 'bold', opacity: 1 }}>
        Go on, Explore Some of Our Books
      </h2>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="text-center my-4 slide-in" style={{ backgroundColor: "black", opacity: 0.8 }}>
      <h1 style={{ color: "#F8E231", fontSize: 33, fontStyle: 'bold', opacity: 1 }}>
        Hi there, it's StoryTime
      </h1>
    </div>
  );
}

const ScrollPrompt = () => {
  const [showSections, setShowSections] = useState(true);

  // Debounced scroll event handler
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleScroll = debounce(() => {
    if (showSections) {
      setShowSections(false); // Hide sections on first scroll
    }
  }, 100); // Debounce delay of 100ms

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up scroll event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showSections]); // Only re-run this effect if `showSections` changes

  return (
    <div className="text-center my-4">
      {showSections && (
        <>
          <WelcomeMessage />
          <ExploreSection />
        </>
      )}
      <p style={{ color: '#F8E231', fontSize: 13, fontStyle: 'bold' }}>Scroll up to See More</p>
      <DisplayBooksComponent />
    </div>
  );
};

export default ScrollPrompt;