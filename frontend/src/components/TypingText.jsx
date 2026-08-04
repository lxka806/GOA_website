import { useEffect, useState } from "react";

const words = [
    "Become Smarter.",
    "Become Disciplined.",
    "Become a Builder.",
    "Become a Leader.",
    "Become Unstoppable.",
    "Become a GOA Student.",
];

function TypingText() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const isComplete = !isDeleting && text === currentWord;
        const isEmpty = isDeleting && text === "";
        const delay = isDeleting ? 40 : 80;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(currentWord.substring(0, text.length + 1));
            } else {
                setText(currentWord.substring(0, text.length - 1));
            }

            if (isComplete) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 1200);
            }

            if (isEmpty) {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-goa-400 leading-tight whitespace-nowrap">
            {text}
            <span className="animate-pulse ml-2 text-goa-200">|</span>
        </h2>
    );
}

export default TypingText;