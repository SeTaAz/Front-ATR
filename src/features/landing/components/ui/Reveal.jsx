import { useEffect, useRef, useState } from "react";

// Fade suave al entrar en pantalla. Respeta "reducir movimiento".
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}