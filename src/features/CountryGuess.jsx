import { useMemo, useState } from "react";
import countries from "../data/countries"; // move your array here

export default function CountryGuess() {
  const [name, setName] = useState("");
  const [iso, setIso] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const guessedName = useMemo(() => {
    const obj = countries.find((c) => c.iso === iso);
    return obj ? obj.name : iso;
  }, [iso]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr("Please enter a name.");
      return;
    }
    try {
      setErr("");
      setIso("");
      setLoading(true);

      const res = await fetch(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const first = data?.country?.[0];
      if (first?.country_id) {
        setIso(first.country_id);
      } else {
        setErr("No prediction found for this name.");
      }
    } catch (e) {
      setErr("Failed to guess country. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-card" aria-busy={loading}>
      <h3>Enter a Name</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name"></label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          placeholder="e.g., Michael"
        />
        <button className="submitWidth" type="submit" disabled={loading || !name.trim()}>
          {loading ? "Predicting..." : "Submit"}
        </button>
      </form>
      {err && <p role="alert" className="error">{err}</p>}
      {iso && <p className="rate">Predicted country: {guessedName} ({iso})</p>}
    </div>
  );
}