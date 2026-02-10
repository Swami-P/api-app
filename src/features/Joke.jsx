import { useEffect, useRef, useState } from "react";

export default function Joke() {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const timerRef = useRef(null);

  const getJoke = async (signal) => {
    try {
      clearTimeout(timerRef.current);
      setErr("");
      setPunchline("");
      setLoading(true);

      const res = await fetch("https://official-joke-api.appspot.com/random_joke", { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setSetup(data.setup);
      timerRef.current = setTimeout(() => setPunchline(data.punchline), 1500);
    } catch (e) {
      if (e.name !== "AbortError") setErr("Failed to load joke.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();
    getJoke(ctrl.signal);
    return () => {
      ctrl.abort();
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="joke-box" aria-busy={loading}>
      <div className="row">
        <button onClick={() => getJoke()} disabled={loading}>
          {loading ? "Loading..." : "New Joke"}
        </button>
      </div>
      {err && <p role="alert" className="error">{err}</p>}
      {setup && <p className="joke-setup">{setup}</p>}
      {punchline && <p className="joke-punchline">{punchline}</p>}
    </div>
  );
}