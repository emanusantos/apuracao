import React from "react";
import "./App.css";

function App() {
  const [results, setResults] = React.useState<any>();

  React.useEffect(() => {
    const fetchResults = async () => {
      const fetchedResults = await fetch(
        "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
      );

      const resultsInJSON = await fetchedResults.json();

      setResults(resultsInJSON);
    };

    fetchResults();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Apuração 2022 - Presidente</h2>

        <br />

        {results?.cand?.map((cand: any) => (
          <div key={cand?.sqcand}>
            <h4>
              {cand?.nm} - {cand?.pvap}% ({cand?.vap} votos)
            </h4>
          </div>
        ))}

        <br />
        <br />
        <br />
        <br />
        <h3>
          Votos apurados: {results?.vv} ({results?.pst}%)
        </h3>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <h4 style={{ textDecoration: "underline" }}>Atualizar</h4>
        </button>
      </div>
    </div>
  );
}

export default App;
