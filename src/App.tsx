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
        <h1>Apuração 2022 - Presidente</h1>

        <br />

        {results?.cand?.map((cand: any) => (
          <div key={cand?.sqcand}>
            <h3>
              {cand?.nm} - {cand?.pvap}%
            </h3>
          </div>
        ))}

        <br />
        <br />
        <br />
        <br />
        <h2>Votos apurados: {results?.vv}</h2>
      </div>
    </div>
  );
}

export default App;
