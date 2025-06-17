import { useEffect, useRef } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function DecodeText({ text = '', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll('span');

    const handleEnter = () => {
      let frame = 0;
      const totalFrames = 50;

      const interval = setInterval(() => {
        spans.forEach((span, i) => {
          if (text[i] === ' ') {
            span.textContent = ' ';
          } else {
            span.textContent = randomChar();
          }
        });

        frame++;

        if (frame >= spans.length) {
          clearInterval(interval);
          spans.forEach((span, i) => {
            span.textContent = text[i];
          })
        }
      }, 40);
    };

    el.addEventListener('mouseenter', handleEnter);
    return () => {
      el.removeEventListener('mouseenter', handleEnter);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="font-mono">{char}</span>
      ))}
    </span>
  );
}

