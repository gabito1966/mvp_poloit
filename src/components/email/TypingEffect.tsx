import { useEffect, useState } from "react";
import useTypingEffect from "./useTypingEffect";

// const texts = [
//   "This is a simple text typing effect in ReactWe can use this effect to create a typing effect for our portfolio",
//   "This effect is created using React HooksWe can use this effect to create a typing effect for our portfolio",
//   "We can use this effect to create a typing effect for our portfolio",
//   "We can also use this effect to create a typing effect for our resume",
//   "or for your blogWe can use this effect to create a typing effect for our portfolio",
//   "or for your landing pageWe can use this effect to create a typing effect for our portfolio",
//   "let's goWe can use this effect to create a typing effect for our portfolioWe can use this effect to create a typing effect for our portfolio",
// ];

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