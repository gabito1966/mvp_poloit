'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    
    let start = 0;
    const end = value;
    const duration = 1000;
    const range = end - start;
    let current = start;

    if(end==start)
      return;

    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      setDisplayValue(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return <span className={className}>{displayValue}</span>;
}