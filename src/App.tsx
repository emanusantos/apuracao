import React from "react";
import "./App.css";

const urlGetter = {
  "/": {
    url: "https://cors-anywhere.herokuapp.com/https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json",
    label: "Presidente",
  },
  "/al": {
    url: "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/al/al-c0003-e000546-r.json",
    label: "Governador",
  },
  "/al/sen": {
    url: "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/al/al-c0005-e000546-r.json",
    label: "Senador",
  },
  "/al/de": {
    url: "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/al/al-c0007-e000546-r.json",
    label: "Dep. Estadual",
  },
  "/al/df": {
    url: "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/al/al-c0006-e000546-r.json",
    label: "Dep. Federal",
  },
};

function App() {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>();

  React.useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      const fetchedResults = await fetch(
        urlGetter[window.location.pathname].url ?? urlGetter["/"].url,
        { headers: {} }
      );

      const resultsInJSON = await fetchedResults.json();

      setResults(resultsInJSON);
      setLoading(false);
    };

    fetchResults();
  }, []);

  return (
    <div className="App">
      {loading && <h2>Carregando...</h2>}

      {!loading && (
        <div>
          <h2>Apuração 2022 - {urlGetter[window.location.pathname].label}</h2>

          <br />

          {results?.cand
            ?.sort((a, b) => {
              if (a?.pvap < b?.pvap) return 1;
              if (a?.pvap > b?.pvap) return -1;
              return 0;
            })
            .map((cand: any) => (
              <div key={cand?.sqcand}>
                <h4>
                  {cand?.nm?.replace("&apos;", "'")} - {cand?.pvap}% (
                  {cand?.vap} votos)
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
