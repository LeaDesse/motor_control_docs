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
          Cliquez sur le schéma pour l'agrandir.
        </p>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Schéma FOC agrandi"
          onClick={() => setIsOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "rgba(0, 0, 0, 0.75)" }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ position: "relative", width: "min(96vw, 1400px)", maxHeight: "92vh", overflow: "auto", padding: "1rem", background: "white", borderRadius: "0.75rem" }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le schéma"
              style={{ position: "sticky", top: 0, float: "right", zIndex: 1, width: "2rem", height: "2rem", border: 0, borderRadius: "999px", background: "#0e2a97", color: "white", fontSize: "1.25rem", cursor: "pointer" }}
            >
              ×
            </button>
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
