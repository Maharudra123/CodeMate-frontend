// hooks/useTypingEffect.js
import { useState, useEffect } from "react";

export const useTypingEffect = (
  words,
  typingSpeed = 150,
  deletingSpeed = 50,
  delayBetweenWords = 2000
) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));

          if (currentText === currentWord) {
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          setCurrentText(currentWord.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return currentText;
};
