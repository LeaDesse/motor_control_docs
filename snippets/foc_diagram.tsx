
import { useEffect, useState } from "react";

export const FocDiagram = () => {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch("/images/foc-overview.svg")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load SVG");
        }
        return response.text();
      })
      .then(setSvg)
      .catch(console.error);
  }, []);

  if (!svg) {
    return <p>Loading FOC diagram...</p>;
  }

  return (
    <div
      style={{ width: "100%", overflowX: "auto" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
