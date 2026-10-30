import { createContext, useContext, useState } from "react";

const colores = {
  oscuro: {
    fondo: "#13212d",
    tarjeta: "#20303d",
    texto: "#f8f3e9",
    textoSecundario: "#a39e94",
    acento: "#d67d5e",
  },
  claro: {
    fondo: "#f8f3e9",
    tarjeta: "#fdfaf4",
    texto: "#152634",
    textoSecundario: "#525f6b",
    acento: "#9f4325",
  },
};

const TemaContext = createContext({
  oscuro: true,
  cambiarTema: () => {},
  colores: colores.oscuro,
});

export function TemaProvider({ children }) {
  const [oscuro, setOscuro] = useState(true);

  const cambiarTema = () => {
    setOscuro(!oscuro);
  };

  return (
    <TemaContext.Provider
      value={{ oscuro, cambiarTema, colores: oscuro ? colores.oscuro : colores.claro }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
