import { useState, useEffect } from "react";

// Hum 'target' aur 'label' ko props ke roop mein pass karenge
const StatCounter = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Animation ki speed adjust karne ke liye logic
    const duration = 2000; // 2 seconds mein animation khatam hogi
    const increment = target / (duration / 16); // 16ms roughly 60fps hota hai

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold text-orange-500">{count}+</h3>
      <p className="text-sm uppercase tracking-wide text-gray-300">{label}</p>
    </div>
  );
};

export default StatCounter;
