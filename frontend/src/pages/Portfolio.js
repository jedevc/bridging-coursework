import React, { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    document.title = "jedevc | Portfolio";
  }, []);
  
  return (
    <section className="section">
      <p>Portfolio goes here...</p>
    </section>
  )
}