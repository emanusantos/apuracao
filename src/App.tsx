import React from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>();

  const isGovernor = window.location.pathname === "/al";

  React.useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      const fetchedResults = await fetch(
        isGovernor
          ? "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/al/al-c0003-e000546-r.json"
          : "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
      );

      const resultsInJSON = await fetchedResults.json();

      setResults(resultsInJSON);
      setLoading(false);
    };

    fetchResults();
  }, [isGovernor]);

  return (
    <div className="App">
      {loading && <h2>Carregando...</h2>}

      {!loading && (
        <div>
          <h2>
            Apuração 2022 -{" "}
            {isGovernor ? "Governador de Alagoas" : "Presidente"}
          </h2>

          <br />

          {results?.cand?.map((cand: any) => (
            <div key={cand?.sqcand}>
              <h4>
                {cand?.nm?.replace("&apos;", "'")} - {cand?.pvap}% ({cand?.vap}{" "}
                votos)
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
      )}
    </div>
  );
}

export default App;
