
export const FocDiagram = () => {
  return (
    <div style={{ width: "100%", maxWidth: "620px", margin: "0 auto" }}>
      <a
        href="/images/foc-overview.svg"
        target="_blank"
        rel="noreferrer"
        title="Ouvrir le schéma FOC en grand"
      >
        <img
          src="/images/foc-overview.svg"
          alt="Schéma d'ensemble FOC"
          style={{ width: "100%", height: "auto", cursor: "zoom-in" }}
        />
      </a>
      <p style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "0.5rem" }}>
        Cliquez sur le schéma pour l'ouvrir en grand et accéder à ses liens.
      </p>
    </div>
  );
};
