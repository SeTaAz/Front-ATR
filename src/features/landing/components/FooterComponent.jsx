import Logo from "./ui/Logo";

export default function FooterComponent() {
  return (
    <footer className="bg-verde-claro px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <Logo className="h-9 w-auto" />
        <p className="text-sm text-gray-600">Refrigeración Comercial e Industrial · RIF J-307241675</p>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Artefrio C.A. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}