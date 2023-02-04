import { useEffect } from "react";

/* Esta función agregará un detector de eventos a la ventana que cerrará el menú 
cuando el usuario haga clic fuera del menú. */

export const useCloseModal = (setState, ref) => {
  const handleClick = (event) => {
    if (event.target !== ref.current) {
      setState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return;
};
