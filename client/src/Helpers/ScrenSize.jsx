import React, { useEffect, useState } from 'react';

 const ScrenSize = () => {
  const [breakpoint, setBreakpoint] = useState('');
  const [Resize, setResize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setResize(screenWidth)
      if (screenWidth < 576) {
        setBreakpoint('X-Small');
      } else if (screenWidth >= 576 && screenWidth < 768) {
        setBreakpoint('Small');
      } else if (screenWidth >= 768 && screenWidth < 992) {
        setBreakpoint('Medium');
      } else if (screenWidth >= 992 && screenWidth < 1200) {
        setBreakpoint('Large');
      } else if (screenWidth >= 1200 && screenWidth < 1400) {
        setBreakpoint('Extra large');
      } else {
        setBreakpoint('Extra extra large');
      }
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <p>Current Breakpoint: {breakpoint} {Resize}</p>
    </div>
  );
};


export default ScrenSize