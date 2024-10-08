import { useEffect, useState } from "react";
import useTypingEffect from "./useTypingEffect";

type TextTypingEffectProps = {
  isTypeByLetter?: boolean;
  duration?: number;
  texts:string;
};

 export  const TextTypingEffectWithTexts: React.FC<TextTypingEffectProps> = ({
  isTypeByLetter = false,
  duration = 100,
  texts
}) => {

  const [textIndex, setTextIndex] = useState(0);
  const textToShow = useTypingEffect(
    texts,
    duration,
    isTypeByLetter
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) =>
        prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="text-black " key={textIndex}>
      {textToShow}
    </p>
  );
};

export default TextTypingEffectWithTexts;