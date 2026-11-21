import { useEffect, useState } from "react";

export const FocDiagram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch("/images/foc-overview.svg")
      .then((response) => response.text())
      .then(setSvg)
      .catch(() => setSvg(""));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <div style={{ width: "100%", maxWidth: "620px", margin: "0 auto" }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{ display: "block", width: "100%", padding: 0, border: 0, background: "transparent", cursor: "zoom-in" }}
          aria-label="Agrandir le schéma FOC"
        >
          <img
            src="/images/foc-overview.svg"
            alt="Schéma d'ensemble FOC"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </button>
        <p style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Cliquez sur le schéma pour l'agrandir. Appuyez sur Échap pour fermer.
        </p>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Schéma FOC agrandi"
          onClick={() => setIsOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 2147483647, isolation: "isolate", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "rgba(0, 0, 0, 0.82)" }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ position: "relative", width: "min(96vw, 1400px)", height: "92vh", overflow: "auto", padding: "1rem", background: "white", borderRadius: "0.75rem" }}
          >
            {svg ? (
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
              <p>Chargement du schéma...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
