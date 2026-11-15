import { useCallback, useEffect, useState } from "react";
import { CLIENTES } from "../data/clientes";

// Enlaces de contacto de Artefrío (los usan el navbar, servicios y contacto).
export const WA = "https://wa.me/584166099071?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios";
export const WA_SECUNDARIO = "https://wa.me/584142506540?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios";

// Tamaño de la órbita de clientes según el ancho de pantalla (responsive).
const ORBITAS = {
  movil: { radiusX: 140, radiusY: 45, itemSize: 52 },
  tablet: { radiusX: 250, radiusY: 65, itemSize: 72 },
  escritorio: { radiusX: 340, radiusY: 80, itemSize: 90 },
};

export default function useLanding() {
  const [ready, setReady] = useState(false);
  const [ancho, setAncho] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );

  useEffect(() => {
    const medirAncho = () => setAncho(window.innerWidth);
    window.addEventListener("resize", medirAncho);
    return () => window.removeEventListener("resize", medirAncho);
  }, []);

  const onHeroDone = useCallback(() => setReady(true), []);

  const orbit = ancho < 640
    ? ORBITAS.movil
    : ancho < 1024
      ? ORBITAS.tablet
      : ORBITAS.escritorio;

  return { ready, onHeroDone, orbit, clientes: CLIENTES };
}
