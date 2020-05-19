import React, { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = "jedevc | Page not found";
  }, []);
  
  return (
    <section class="section">
      <p>Page not found.</p>
    </section>
  )
}