import { useEffect } from "react";

import NavComponent from "../components/NavComponent";
import HeroComponent from "../components/HeroComponent";
import NosotrosComponent from "../components/NosotrosComponent";
import ServiciosComponent from "../components/ServiciosComponent";
import SectoresComponent from "../components/SectoresComponent";
import ClientesComponent from "../components/ClientesComponent";
import PorqueComponent from "../components/PorqueComponent";
import MisionVisionComponent from "../components/MisionVisionComponent";
import ContactoComponent from "../components/ContactoComponent";
import FooterComponent from "../components/FooterComponent";
import SectionDotsComponent from "../components/SectionDotsComponent";
import useLanding from "../hooks/useLanding";

const LandingPage = () => {
  const { ready, onHeroDone, orbit, clientes } = useLanding();

  // Scroll suave y espacio para que el menú no tape los títulos al navegar.
  useEffect(() => {
    const el = document.documentElement;
    el.style.scrollBehavior = "smooth";
    el.style.scrollPaddingTop = "4rem";
    return () => {
      el.style.scrollBehavior = "";
      el.style.scrollPaddingTop = "";
    };
  }, []);

  return (
    <>
      <SectionDotsComponent visible={ready} />
      <main id="top">
        <NavComponent visible={ready} />
        <HeroComponent
          duration={4000} // duración en ms
          lockScroll // bloquea el scroll en la primera visita
          onDone={onHeroDone}
        />

        {/* El resto de la página va debajo del hero */}
        <div className="min-h-screen">
          <section id="nosotros">
            <NosotrosComponent />
          </section>

          <ServiciosComponent />
          <SectoresComponent />
          <ClientesComponent orbit={orbit} clientes={clientes} />
          <PorqueComponent />
          <MisionVisionComponent />
        </div>

        <ContactoComponent />
      </main>
      <FooterComponent />
    </>
  );
};

export default LandingPage;
