'use client';

import { AnimatedBarProps } from '@/lib/definitions/frontEndDefinitions';
import React, { useState, useEffect } from 'react';

const AnimatedBar: React.FC<AnimatedBarProps> = ({ 
  chartHeight, 
  topLabel, 
  cantTotalEstudiantes, 
  tecnologia 
}) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeight((chartHeight / topLabel) * tecnologia.cantidad_estudiantes);
    }, 100);
    return () => clearTimeout(timer);
  }, [chartHeight, topLabel, tecnologia.cantidad_estudiantes]);

  return (
    <div
      className="w-9 rounded-sm bg-blue-400 z-10 transition-all duration-500 ease-out"
      style={{
        height: `${height}px`,
      }}
      title={`${tecnologia.cantidad_estudiantes} estudiantes (${Math.round(
        (tecnologia.cantidad_estudiantes / cantTotalEstudiantes) * 100
      )}%)`}
    >
      <span className="text-white text-lg font-semibold text-nowrap -rotate-90 sm:hidden block mt-5">
        {Math.round(
          (tecnologia.cantidad_estudiantes / cantTotalEstudiantes) * 100
        )}{" "}
        %
      </span>
    </div>
  );
};

export default AnimatedBar;