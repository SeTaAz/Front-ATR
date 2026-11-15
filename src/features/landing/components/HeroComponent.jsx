import { useEffect, useRef, useState } from "react";
import { LOGO } from "../data/logo";


// ---------- utilidades de color ----------
const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const toHsl = (hexStr) => {
  const [r, g, b] = toRgb(hexStr);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  const d = max - min;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
};
const hsl = (h, s, l) => `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
const lerpHsl = (a, b, u) => hsl(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u);
const mixHex = (a, b, t) => {
  const A = toRgb(a), B = toRgb(b);
  return `rgb(${A.map((v, i) => Math.round((v + (B[i] - v) * t) * 255)).join(",")})`;
};
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Tres estados de color por pieza: caliente (ARTE amarillo, FRIO rojo), frío (azul) y el original del logo.
const warmOf = (f, kind) => {
  const [h, , l] = toHsl(f);
  if (kind === "arte") return [48, 1, 0.5];
  return [4 + (h - 84) * 0.1, 0.9, 0.36 + (l - 0.3) * 0.5];
};
const coldOf = (f, kind) => {
  const [, , l] = toHsl(f);
  if (kind === "arte") return [205, 0.9, 0.5];
  return [215, 0.8, 0.3 + (l - 0.3) * 0.6];
};

// ---------- línea de tiempo ----------
const T_START = 38, T_MIN = -2, T_END = 18;
const TD = 0.6; // fracción del tiempo total que dura la bajada (el resto es la subida)
const HOT = "#e63b2e", COLD = "#2f7fe0";
const FAN_CX = 1494, FAN_CY = 419; // centro real del ventilador en el SVG original

// Altura (y) del tope del mercurio en el SVG según la temperatura
const mercuryTop = (T) => (T >= T_END ? 215 + (T_START - T) * 4.5 : 305 + (T_END - T) * 2);

export function HeroComponent({ duration = 6500, lockScroll = true, onDone }) {
  const [t, setT] = useState(0);
  const [done, setDone] = useState(false);
  const fanRef = useRef(null);

  useEffect(() => {
    let reduced = false, seen = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seen = !!sessionStorage.getItem("artefrio-hero-seen");
    } catch (e) {}

    if (reduced) { setT(1); setDone(true); onDone?.(); return; }

    const lock = lockScroll && !seen;
    if (lock) document.documentElement.style.overflow = "hidden";

    let raf, start, last, ang = 0, finished = false;
    const tick = (now) => {
      if (!start) { start = now; last = now; }
      const k = Math.min((now - start) / duration, 1);
      const dt = (now - last) / 1000;
      last = now;
      // acelera hasta el punto más frío y luego se calma a un giro suave
      const up = Math.min(k / TD, 1);
      const down = k > TD ? (k - TD) / (1 - TD) : 0;
      const speed = 900 * up * up * (1 - down) + 90 * down;
      ang = (ang + speed * dt) % 360;
      fanRef.current?.setAttribute("transform", `rotate(${ang} ${FAN_CX} ${FAN_CY})`);
      if (!finished) {
        setT(k);
        if (k >= 1) {
          finished = true;
          setDone(true);
          if (lock) document.documentElement.style.overflow = "";
          try { sessionStorage.setItem("artefrio-hero-seen", "1"); } catch (e) {}
          onDone?.();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (lock) document.documentElement.style.overflow = "";
    };
  }, []);

  // fase 1: 38 → -2 (calor a azul). fase 2: -2 → 18 (azul al verde original)
  const goingDown = t < TD;
  const u = goingDown ? ease(t / TD) : ease((t - TD) / (1 - TD));
  const T = goingDown ? T_START + (T_MIN - T_START) * u : T_MIN + (T_END - T_MIN) * u;

  const tint = (f, kind) =>
    goingDown ? lerpHsl(warmOf(f, kind), coldOf(f, kind), u) : lerpHsl(coldOf(f, kind), toHsl(f), u);
  const liquid = goingDown ? mixHex(HOT, COLD, u) : mixHex(COLD, LOGO.mercury.f, u);

  const pair = (a, b, c, d, x) => `radial-gradient(circle at 50% 45%, ${mixHex(a, b, x)}, ${mixHex(c, d, x)} 70%)`;
  const bg = goingDown
    ? pair("#fff3e6", "#eaf4ff", "#ffe6d0", "#d6e9ff", u)
    : pair("#eaf4ff", "#ffffff", "#d6e9ff", "#ffffff", u);
  const haloAmt = goingDown ? 0.6 - 0.25 * u : 0.35 * (1 - u); // ayuda a que amarillo, rojo y azul claro destaquen
  const halo = `drop-shadow(0 0 3px rgba(60,40,50,${haloAmt.toFixed(2)}))`;

  const mTop = mercuryTop(T);
  const show = t > TD || done;
  const P = (o, fill) => <path d={o.d} transform={`translate(${o.x} ${o.y})`} fill={fill} />;

  return (
    <section
      className="relative flex min-h-screen w-full flex-col pt-16 items-center justify-center px-8 text-center"
      style={{ background: bg }}
    >
      <svg viewBox="180 180 1720 330" className="w-full max-w-6xl" style={{ filter: halo }} role="img" aria-label="Artefrío C.A.">
        <defs>
          <clipPath id="artefrio-merc"><rect x="1400" y={mTop} width="250" height="400" /></clipPath>
        </defs>
        {LOGO.letters.map((o, i) => <g key={i}>{P(o, tint(o.f, o.x < 1000 ? "arte" : "frio"))}</g>)}
        {P(LOGO.outline, tint(LOGO.outline.f, "frio"))}
        <rect x="1480" y={mTop} width="27" height={Math.max(0, 345 - mTop)} rx="13.5" fill={liquid} />
        <g clipPath="url(#artefrio-merc)">{P(LOGO.mercury, liquid)}</g>
        <g ref={fanRef}>{P(LOGO.fan, liquid)}</g>
        {LOGO.ca.map((o, i) => <g key={i}>{P(o, o.f)}</g>)}
      </svg>

      <div className="mt-4 text-3xl font-extrabold tabular-nums" style={{ color: liquid }}>
        {Math.round(T)}°C
      </div>

      <p
        className="mt-6 max-w-3xl text-xl text-neutral-700 transition-all duration-700 md:text-3xl"
        style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(12px)" }}
      >
        En Artefrío somos especialistas en{" "}
        <strong style={{ color: "#3b6d34" }}>refrigeración comercial e industrial y aire acondicionado.</strong>
      </p>

      <div
        className="absolute bottom-8 text-sm tracking-widest text-neutral-500 transition-opacity duration-700"
        style={{ opacity: done ? 1 : 0 }}
      >
        ↓ DESLIZA
      </div>
    </section>
  );
}

export default HeroComponent;