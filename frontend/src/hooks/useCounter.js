import { useEffect, useState } from "react";

export default function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease Out Animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}