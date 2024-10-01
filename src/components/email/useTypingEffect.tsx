import { useEffect, useState } from "react";

export  const useTypingEffect = (
    text: string,
    duration: number,
    isTypeByLetter = false
  ) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const items = isTypeByLetter ? text.split("") : text.split(" ");
  
    useEffect(() => {
      setCurrentPosition(0);
    }, [text]);
  
    useEffect(() => {
      if (currentPosition >= items.length) return;
  
      const intervalId = setInterval(() => {
        setCurrentPosition((prevPosition:number) => prevPosition + 1);
      }, duration);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [currentPosition, items, duration]);
  
    return items.slice(0, currentPosition).join(isTypeByLetter ? "" : ` `);
  };

  export default useTypingEffect;