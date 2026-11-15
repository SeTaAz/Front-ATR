import { useEffect, useState } from "react";

// Componente 100% independiente: no usa Tailwind ni otros archivos del proyecto.
// Los estilos van en línea y las secciones llegan por la prop `sections`.

const DEFAULT_SECTIONS = [
  { id: "top", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "sectores", label: "Sectores" },
  { id: "clientes", label: "Clientes" },
  { id: "porque", label: "Por qué elegirnos" },
  { id: "mision-vision", label: "Misión y visión" },
  { id: "contacto", label: "Contacto" },
];

export default function SectionDotsComponent({
  sections = DEFAULT_SECTIONS,
  visible = true,          // pásale `ready` para que aparezca después del hero
  hideAfter = 1500,        // ms sin hacer scroll para que se oculte
  activeColor = "#81C341",
  passedColor = "#3b6d34",
  idleColor = "#ffffff",
  lineColor = "rgba(150,180,120,.5)",
  lineDoneColor = "#81C341",
  labelBg = "#1f4a2a",
  minWidth = 768,          // se oculta en pantallas más angostas (celular)
}) {
  const [active, setActive] = useState(0);
  const [awake, setAwake] = useState(false); // true mientras haces scroll
  const [hover, setHover] = useState(false); // true si el mouse está cerca
  const [tip, setTip] = useState(-1);        // punto con el nombre visible
  const [wide, setWide] = useState(typeof window === "undefined" ? true : window.innerWidth >= minWidth);

  const ids = sections.map((s) => s.id).join("|");

  useEffect(() => {
    let timer;
    const measure = () => {
      let a = 0;
      sections.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) a = i;
      });
      return a;
    };
    const onScroll = () => {
      setActive(measure());
      setAwake(true);
      clearTimeout(timer);
      timer = setTimeout(() => setAwake(false), hideAfter);
    };
    setActive(measure()); // posición inicial, sin mostrar los puntos
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [ids, hideAfter]);

  useEffect(() => {
    const f = () => setWide(window.innerWidth >= minWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [minWidth]);

  const go = (id) => (e) => {
    e.preventDefault();
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const show = visible && (awake || hover);
  if (!wide) return null;

  return (
    <nav
      aria-label="Secciones"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTip(-1); }}
      style={{
        position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 30,
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "16px 12px 16px 40px", // la zona izquierda extra facilita acercar el mouse
        opacity: show ? 1 : 0, transition: "opacity .4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {sections.map(({ id, label }, i) => (
        <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <a
            href={`#${id}`}
            onClick={go(id)}
            onMouseEnter={() => setTip(i)}
            aria-label={label}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }}
          >
            <span
              style={{
                position: "absolute", right: 24, whiteSpace: "nowrap", pointerEvents: "none",
                background: labelBg, color: "#fff", fontSize: 11, fontWeight: 600,
                padding: "3px 8px", borderRadius: 999,
                opacity: tip === i ? 1 : 0, transition: "opacity .2s",
              }}
            >
              {label}
            </span>
            <span
              style={{
                display: "block", borderRadius: "50%", transition: "all .4s ease",
                width: i === active ? 11 : 7, height: i === active ? 11 : 7,
                background: i < active ? passedColor : i === active ? activeColor : idleColor,
                boxShadow:
                  i === active
                    ? "0 0 0 1.5px #fff, 0 0 0 4px rgba(129,195,65,.4)"
                    : `0 0 0 1.5px ${i < active ? "#fff" : "#b9d4a0"}`,
              }}
            />
          </a>
          {i < sections.length - 1 && (
            <span style={{ width: 2, height: 10, transition: "background .4s", background: i < active ? lineDoneColor : lineColor }} />
          )}
        </div>
      ))}
    </nav>
  );
}