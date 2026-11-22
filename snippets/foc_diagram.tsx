import { useEffect, useRef, useState } from "react";

export const FocDiagram = () => {
  const [svg, setSvg] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    fetch("/images/foc-overview.svg")
      .then((response) => response.text())
      .then(setSvg)
      .catch(() => setSvg(""));
  }, []);

  const openDialog = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <style>{`
        .foc-dialog {
          box-sizing: border-box;
          width: min(96vw, 1400px);
          height: 92vh;
          margin: auto;
          padding: 1rem;
          border: 0;
          border-radius: 0.75rem;
          overflow-x: hidden;
          overflow-y: auto;
        }
        .foc-dialog::backdrop {
          background: rgba(0, 0, 0, 0.82);
        }
        .foc-dialog__content {
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }
        .foc-dialog__content svg {
          display: block;
          width: 100% !important;
          max-width: 100%;
          height: auto !important;
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "620px", margin: "0 auto" }}>
        <button
          type="button"
          onClick={openDialog}
          aria-label="Agrandir le schéma FOC"
          style={{ display: "block", width: "100%", padding: 0, border: 0, background: "transparent", cursor: "zoom-in" }}
        >
          <img
            src="/images/foc-overview.svg"
            alt="Schéma d'ensemble FOC"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </button>
        <p style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Cliquez sur le schéma pour l'agrandir. Cliquez en dehors pour fermer.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="foc-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        onCancel={closeDialog}
        aria-label="Schéma FOC agrandi"
      >
        <div className="foc-dialog__content">
          {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>Chargement du schéma...</p>}
        </div>
      </dialog>
    </>
  );
};
